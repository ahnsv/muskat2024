/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lMh5HhIxM4U
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function OrderShippingAddressAccordion() {
  const [addresses, setAddresses] = useState([
    {
      name: "John Doe",
      address1: "123 Main St",
      address2: "Apt 456",
      city: "San Francisco",
      state: "CA",
      zip: "94101",
      items: 2,
    },
  ])
  const addAddress = () => {
    setAddresses([
      ...addresses,
      {
        name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        items: 1,
      },
    ])
  }
  const updateAddress = (index: number, updatedAddress: any) => {
    const newAddresses = [...addresses]
    newAddresses[index] = updatedAddress
    setAddresses(newAddresses)
  }
  const removeAddress = (index: number) => {
    const newAddresses = [...addresses]
    newAddresses.splice(index, 1)
    setAddresses(newAddresses)
  }
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible>
        {addresses.map((address, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="flex items-center justify-between">
              <div className="font-medium">
                {address.address1}, {address.city}, {address.state} {address.zip}
              </div>
              <div className="text-muted-foreground">
                {address.items} {address.items === 1 ? "item" : "items"}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  updateAddress(index, address)
                }}
                className="grid gap-4 mt-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${index}`}>Name</Label>
                    <Input
                      id={`name-${index}`}
                      value={address.name}
                      onChange={(e) =>
                        updateAddress(index, {
                          ...address,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`items-${index}`}>Items</Label>
                    <div className="flex items-center gap-4">
                      <Select>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product1">Product 1</SelectItem>
                          <SelectItem value="product2">Product 2</SelectItem>
                          <SelectItem value="product3">Product 3</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id={`items-${index}`}
                        type="number"
                        min={1}
                        value={address.items}
                        onChange={(e) =>
                          updateAddress(index, {
                            ...address,
                            items: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`address1-${index}`}>Address Line 1</Label>
                  <Input
                    id={`address1-${index}`}
                    value={address.address1}
                    onChange={(e) =>
                      updateAddress(index, {
                        ...address,
                        address1: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`address2-${index}`}>Address Line 2</Label>
                  <Input
                    id={`address2-${index}`}
                    value={address.address2}
                    onChange={(e) =>
                      updateAddress(index, {
                        ...address,
                        address2: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`city-${index}`}>City</Label>
                    <Input
                      id={`city-${index}`}
                      value={address.city}
                      onChange={(e) =>
                        updateAddress(index, {
                          ...address,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`state-${index}`}>State</Label>
                    <Input
                      id={`state-${index}`}
                      value={address.state}
                      onChange={(e) =>
                        updateAddress(index, {
                          ...address,
                          state: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`zip-${index}`}>Zip Code</Label>
                    <Input
                      id={`zip-${index}`}
                      value={address.zip}
                      onChange={(e) =>
                        updateAddress(index, {
                          ...address,
                          zip: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => removeAddress(index)}>
                    Remove
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex justify-end">
        <Button onClick={addAddress}>New Address</Button>
      </div>
    </div>
  )
}
