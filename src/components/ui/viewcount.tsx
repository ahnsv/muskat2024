'use client';

import React, { useState, useEffect, useCallback } from 'react';

const ViewCounter: React.FC = () => {
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [hasExpired, setHasExpired] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchViewData = useCallback(async () => {
    try {
      const response = await fetch('/api/views', {
        method: 'GET',
      });
      if (response.status === 400) {
        return
      }
      const data = await response.json();

      if (response.ok) {
        setViewCount(data.view_count);
        setHasExpired(data.has_expired);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch view data');
    }
  }, []);

  const handleViewPage = useCallback(async () => {
    try {
      const response = await fetch('/api/views', {
        method: 'POST',
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to increment view count');
    }
  }, []);

  useEffect(() => {
    fetchViewData();
    handleViewPage();
  }, [fetchViewData, handleViewPage]);


  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <p>View Count: {viewCount}</p>
          <p>{hasExpired ? 'This page has expired.' : 'This page is still active.'}</p>
        </>
      )}
    </div>
  );
};

export default ViewCounter;

