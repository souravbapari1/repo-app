"use client";
import WorkSpace from "@/components/elements/workspace/WorkSpace";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { sweetAlert } from "@repo/ui/sweetalert";
function page() {
  return (
    <WorkSpace>
      <div className="flex flex-col gap-4">
        <div className="w-full h-96 bg-gray-200"></div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          earum, placeat possimus enim sint voluptate velit totam maiores a
          harum est unde soluta consectetur dolorum labore impedit. Architecto
          quod debitis blanditiis aliquid, cum quae quas assumenda. Dolorem
          adipisci odit ea ipsa sapiente deserunt? Atque harum officia quia
          quidem sit a fuga necessitatibus blanditiis quasi eaque delectus
          aliquam alias consequuntur voluptas dicta ipsum eligendi perspiciatis
          dolore ipsam voluptatem eos animi, maxime unde. Quas non nisi
          pariatur. Fugiat, nulla incidunt optio eveniet rem illum. Vitae,
          temporibus minima. Aliquam eaque corporis saepe quae qui et reiciendis
          ipsum tenetur. Iure incidunt voluptatibus eveniet molestiae?
        </p>
        <div className="flex gap-4">
          <Button
            onClick={() => {
              sweetAlert.prompt("Create New Unit Type");
            }}
          >
            Test App
          </Button>
          <Button variant="success">Test App</Button>
        </div>
        <div className="w-96">
          <Card>
            <CardHeader className="bg-gray-100 ">
              <CardTitle>Login Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="email">Password</Label>
                <Input
                  id="email"
                  placeholder="Enter your Password"
                  className="mt-1"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Login Account</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </WorkSpace>
  );
}

export default page;
