import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge"
import { StarsIcon } from "lucide-react";
import { DM_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ComponentBox from "@/components/custom/component_box";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

async function Home() {

  return (
    <div className="homePage relative bg-[#0e0f0e] min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8">

      <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden pointer-events-none hidden md:block">
        <div
          className={cn(
            "w-full h-full opacity-40 animate-gridMove",
            "bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]",
            "bg-[size:40px_40px]",
            "[mask-image:radial-gradient(ellipse_at_left,black_20%,transparent_80%)]"
          )}
        />
      </div>

      <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden pointer-events-none hidden md:block">
        <div
          className={cn(
            "w-full h-full opacity-40 animate-gridMove",
            "bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]",
            "bg-[size:40px_40px]",
            "[mask-image:radial-gradient(ellipse_at_right,black_20%,transparent_80%)]"
          )}
        />
      </div>

      <Badge className={cn("mt-6 sm:mt-8 px-3 sm:px-4 py-1 text-xs sm:text-sm border-1 border-gray-800 flex items-center gap-1")}>
        4.9 rated <StarsIcon className="w-3 h-3 sm:w-4 sm:h-4" />
        <StarsIcon className="w-3 h-3 sm:w-4 sm:h-4" />
      </Badge>

      <h1 className={cn(
        "text-white mt-8 sm:mt-12 w-full max-w-[90%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl",
        "text-3xl sm:text-5xl md:text-6xl lg:text-[5rem]",
        "text-center leading-tight sm:leading-[3rem] md:leading-[3.5rem] lg:leading-[4.5rem]",
        dmSans.className
      )}>
        AI Customer dealing within seconds
      </h1>

      <h3 className={cn(
        "text-gray-300 mt-4 sm:mt-6 px-4 text-sm sm:text-base md:text-lg",
        "text-center w-full max-w-[90%] sm:max-w-lg md:max-w-xl lg:max-w-[40rem]",
        dmSans.className
      )}>
        The AI platform to create your own agents for your own organization with custom datasource and{" "}
        <span className="text-yellow-400">embed anywhere</span> you want!
      </h3>

      <Button className="mt-8 sm:mt-12 w-48 sm:w-52 md:w-60 h-14 sm:h-16 md:h-20 text-lg sm:text-xl md:text-2xl bg-[#0e0f0e] outline border-[0.2px] border-zinc-100/20 transition-all hover:bg-gray-800/40 cursor-pointer font-semibold">
        Create Agent
      </Button>

      <Separator className="bg-gray-800 mt-16 sm:mt-20" />
      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 w-full max-w-4xl mt-16 sm:mt-20 lg:mt-24 border border-zinc-800 rounded-xl">

          <div className="sm:col-span-2 lg:col-span-1 lg:row-span-3 border-b sm:border-b-0 sm:border-r lg:border-r border-zinc-800">
            <ComponentBox
              featureName="Instant AI Support"
              imageUrl="https://cdn-icons-png.flaticon.com/128/4712/4712109.png"
              className="h-full rounded-none text-3xl sm:text-2xl justify-center flex flex-col items-center"
              first={true}
            />
          </div>

          <ComponentBox
            featureName="Custom Knowledge Base"
            imageUrl="https://cdn-icons-png.flaticon.com/128/2991/2991148.png"
            className="rounded-none border-b sm:border-r lg:border-r border-zinc-800"
          />

          <ComponentBox
            featureName="Multi-Channel Deployment"
            imageUrl="https://cdn-icons-png.flaticon.com/128/724/724933.png"
            className="rounded-none border-b border-zinc-800"
          />

          <ComponentBox
            featureName="Real-Time Analytics"
            imageUrl="https://cdn-icons-png.flaticon.com/128/1828/1828919.png"
            className="rounded-none border-b sm:border-r lg:border-r border-zinc-800"
          />

          <ComponentBox
            featureName="Human Handoff"
            imageUrl="https://cdn-icons-png.flaticon.com/128/4149/4149678.png"
            className="rounded-none border-b border-zinc-800"
          />

          <ComponentBox
            featureName="Secure by Default"
            imageUrl="https://cdn-icons-png.flaticon.com/128/3064/3064197.png"
            className="rounded-none border-b sm:border-b-0 sm:border-r lg:border-r border-zinc-800"
          />

          <ComponentBox
            featureName="Plug-and-Play Setup"
            imageUrl="https://cdn-icons-png.flaticon.com/128/992/992700.png"
            className="rounded-none"
          />

        </div>
      </div>

      <div className="w-full max-w-4xl mt-20 sm:mt-24 px-4 sm:px-6 lg:px-8">
        <p className={cn("text-gray-500 text-center text-sm tracking-wider uppercase mb-8", dmSans.className)}>
          Trusted by teams worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-40">
          <div className="text-gray-400 text-xl sm:text-2xl font-bold">ACME</div>
          <div className="text-gray-400 text-xl sm:text-2xl font-bold">TechCo</div>
          <div className="text-gray-400 text-xl sm:text-2xl font-bold">StartupX</div>
          <div className="text-gray-400 text-xl sm:text-2xl font-bold">GlobalInc</div>
        </div>
      </div>

      <div className="w-full max-w-4xl mt-20 sm:mt-24 px-4 sm:px-6 lg:px-8">
        <h2 className={cn("text-white text-3xl sm:text-4xl text-center mb-4", dmSans.className)}>
          Simple Pricing
        </h2>
        <p className="text-gray-400 text-center mb-12">Choose the plan that fits your needs</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-zinc-800 rounded-xl p-8 hover:border-zinc-700 transition-all">
            <h3 className={cn("text-white text-xl mb-2", dmSans.className)}>Starter</h3>
            <div className="mb-6">
              <span className="text-white text-4xl font-bold">$29</span>
              <span className="text-gray-500">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="text-gray-300 text-sm">✓ 1 AI Agent</li>
              <li className="text-gray-300 text-sm">✓ 1,000 conversations/mo</li>
              <li className="text-gray-300 text-sm">✓ Basic analytics</li>
              <li className="text-gray-300 text-sm">✓ Email support</li>
            </ul>
            <Button variant="outline" className="w-full border-zinc-700 cursor-pointer text-white hover:bg-gray-800 hover:text-white">
              Get Started
            </Button>
          </div>

          <div className="border-2 border-yellow-400/50 rounded-xl p-8 relative hover:border-yellow-400 transition-all">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold">
              POPULAR
            </div>
            <h3 className={cn("text-white text-xl mb-2", dmSans.className)}>Pro</h3>
            <div className="mb-6">
              <span className="text-white text-4xl font-bold">$99</span>
              <span className="text-gray-500">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="text-gray-300 text-sm">✓ 5 AI Agents</li>
              <li className="text-gray-300 text-sm">✓ 10,000 conversations/mo</li>
              <li className="text-gray-300 text-sm">✓ Advanced analytics</li>
              <li className="text-gray-300 text-sm">✓ Priority support</li>
              <li className="text-gray-300 text-sm">✓ Custom branding</li>
            </ul>
            <Button className="w-full bg-transparent outline-yellow-500 border-1 border-yellow-500 hover:text-black hover:bg-yellow-500  text-white cursor-pointer">
              Get Started
            </Button>
          </div>

          <div className="border border-zinc-800 rounded-xl p-8 hover:border-zinc-700 transition-all">
            <h3 className={cn("text-white text-xl mb-2", dmSans.className)}>Enterprise</h3>
            <div className="mb-6">
              <span className="text-white text-4xl font-bold">Custom</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="text-gray-300 text-sm">✓ Unlimited agents</li>
              <li className="text-gray-300 text-sm">✓ Unlimited conversations</li>
              <li className="text-gray-300 text-sm">✓ Custom integrations</li>
              <li className="text-gray-300 text-sm">✓ Dedicated support</li>
              <li className="text-gray-300 text-sm">✓ SLA guarantee</li>
            </ul>
            <Button variant="outline" className="w-full border-zinc-700 text-white cursor-pointer hover:bg-gray-800 hover:text-white">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
      <Separator className="bg-gray-800 mt-16 sm:mt-20" />

      <div className="grid w-full max-w-sm items-center gap-3 mt-16 mb-32">
        <Label className="text-white text-2xl">Redeem code</Label>
        <Input type="text" id="redeem" placeholder="Redeem code" className={cn("outline-none border-1 border-zinc-800 px-4 py-2 text-white text-2xl")} />
        <Button variant="outline" className="text-white cursor-pointer hover:bg-gray-800 border-gray-700 hover:text-white transition-all">Submit</Button>
      </div>


    </div>
  );
}
export default Home;
