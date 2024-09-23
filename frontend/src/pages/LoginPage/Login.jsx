

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginWithEmail from "./components/LoginWithEmail";
import LoginWithUsername from "./components/LoginWithUsername";

export default function Login() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Tabs defaultValue="username" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="username">Username</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="username">
          <LoginWithUsername/>
        </TabsContent>
        <TabsContent value="email">
          <LoginWithEmail />
        </TabsContent>
      </Tabs>
    </div>
  );
}
