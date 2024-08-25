import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ViewCounter from "@/components/ui/viewcount";
import LinkCreationDialog from "@/components/app/link-creation-dialog";

export default function Home() {
  return (
    <main>
      <div className="container flex flex-col items-center h-full">
        <Card className="min-w-[66vw] my-2 w-full h-full">
          <CardHeader>
            <CardTitle>You are invited</CardTitle>
            {/* Invited by */}
            {/* Active until... */}
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-2xl my-2"
            >
              <CarouselContent>
                {/* TODO: add images */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-3xl font-semibold">{index + 1}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="row-span-2 flex flex-col justify-center">
              <h1 className="text-2xl font-semibold mb-4">험프리네 샤인머스켓 </h1>
              <p className="text-gray-600 mb-4">
                <i>
                  “2024 추석 후회 없는 선택”<br></br>
                </i>
                경북 김천에서 나고 자란 험프리가 추천하는 험프리네 샤인머스캣🍇
              </p>
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold text-gray-800 mr-2">
                  ₩300000
                </span>
              </div>
            </div>
            {/* options */}
          </CardContent>
          <CardFooter className="flex">
            <LinkCreationDialog />
            <Button>예약하기</Button>
            <ViewCounter />
          </CardFooter>
        </Card>
      </div>

    </main>
  );
}
