import Link from "next/link";
import { Button } from "@/components/ui/button";
import Leaderboard from "@/components/Leaderboard";
import {
  Users,
  CodeXml,
  Trophy,
  MessageSquare,
  Zap,
  BadgeCheck,
  ArrowRight,
  Terminal,
} from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight-new";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-center pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[#040609]">
          <Spotlight />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00BCA2]/20 via-transparent to-transparent opacity-50" />
        </div>
        <div className="inline-flex items-center rounded-full border border-[#00BCA2]/30 bg-[#00BCA2]/10 px-3 py-1 text-sm text-[#00BCA2] backdrop-blur-md mb-8">
          <span className="flex h-2 w-2 rounded-full bg-[#00BCA2] mr-2 animate-pulse"></span>
          Welcome to the next coding era
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center max-w-5xl mx-auto mb-6">
          Connect. Code. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BCA2] to-emerald-400">
            Compete.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-10 leading-relaxed">
          Join our ACM community to showcase your projects, collaborate with peers,
          and climb the leaderboard through LeetCode and GitHub achievements.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
          <Link href="/dashboard">
            <Button size="lg" className="rounded-full h-12 px-8 text-base bg-[#00BCA2] text-black hover:bg-[#00BCA2]/90 font-semibold w-full sm:w-auto">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="#leaderboard">
            <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base border-white/20 bg-white/5 hover:bg-white/10 w-full sm:w-auto">
              View Leaderboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
          <StatsCard
            icon={<Users className="h-8 w-8 text-blue-400" />}
            value="500+"
            label="Active Members"
          />
          <StatsCard
            icon={<CodeXml className="h-8 w-8 text-purple-400" />}
            value="1,200+"
            label="Projects Shared"
          />
          <StatsCard
            icon={<Trophy className="h-8 w-8 text-yellow-400" />}
            value="50K+"
            label="Problems Solved"
          />
        </div>
      </section>

      <section className="py-24 bg-secondary/20 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              Everything You Need to <span className="text-[#00BCA2]">Excel</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools you need to showcase your work, learn from others, and compete with the best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<CodeXml />}
              title="Project Showcase"
              description="Share your projects with the community, get feedback, and discover amazing work from fellow developers."
              color="text-blue-400"
              bg="bg-blue-500/10"
            />
            <FeatureCard
              icon={<MessageSquare />}
              title="Chat Rooms"
              description="Join topic-based chat rooms to ask questions, share knowledge, and collaborate on projects in real-time."
              color="text-purple-400"
              bg="bg-purple-500/10"
            />
            <FeatureCard
              icon={<Trophy />}
              title="Competitive Leaderboard"
              description="Climb the ranks based on your LeetCode solutions and GitHub contributions. Compete with peers and level up."
              color="text-yellow-400"
              bg="bg-yellow-500/10"
            />
            <FeatureCard
              icon={<Users />}
              title="Community Network"
              description="Connect with like-minded developers, form teams, and build lasting relationships in tech."
              color="text-pink-400"
              bg="bg-pink-500/10"
            />
            <FeatureCard
              icon={<Zap />}
              title="Real-time Updates"
              description="Stay updated with live notifications for new projects, messages, and leaderboard changes."
              color="text-orange-400"
              bg="bg-orange-500/10"
            />
            <FeatureCard
              icon={<BadgeCheck />}
              title="Skill Verification"
              description="Verify your skills through connected LeetCode and GitHub profiles. Show off your authentic achievements."
              color="text-green-400"
              bg="bg-green-500/10"
            />
          </div>
        </div>
      </section>

      {/* --- LEADERBOARD PREVIEW --- */}
      <section id="leaderboard" className="py-24 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[#00BCA2]">
                <Trophy className="h-5 w-5" />
                <span className="font-semibold uppercase tracking-wider text-sm">Champions</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Top Performers</h2>
              <p className="text-muted-foreground">See who's leading the pack with their coding achievements.</p>
            </div>
            <Link href="/leaderboard">
              <Button variant="outline" className="group">
                View Full Leaderboard
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl">
            <Leaderboard />
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#00BCA2] -z-20"></div>
        <div className="absolute inset-0 bg-black/80 -z-10"></div>
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="inline-flex items-center justify-center p-2 bg-white/10 backdrop-blur-md rounded-full mb-8">
            <span className="text-sm font-medium text-white px-2">🚀 Join our community today</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Level Up Your Coding <br /> Journey?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            Join hundreds of students already connecting, learning, and competing on our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="rounded-full h-14 px-8 text-lg bg-white text-[#00BCA2] hover:bg-gray-100 border-none font-bold">
                Get Started Now
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg text-white border-white hover:bg-white/10 hover:text-white">
                Browse Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold tracking-tight text-white">
                  ACM <span className="text-[#00BCA2]">CLUB</span>
                </span>
              </Link>
              <p className="text-sm text-gray-400">
                Connecting students through technology. Learn, build, and compete together.
              </p>
              <div className="flex gap-4 mt-6">
                {/* Social Icons placeholders */}
                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00BCA2] hover:text-black transition-colors cursor-pointer"><Terminal size={16} /></div>
                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00BCA2] hover:text-black transition-colors cursor-pointer"><CodeXml size={16} /></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-[#00BCA2] cursor-pointer">Projects</li>
                <li className="hover:text-[#00BCA2] cursor-pointer">Leaderboard</li>
                <li className="hover:text-[#00BCA2] cursor-pointer">Community</li>
                <li className="hover:text-[#00BCA2] cursor-pointer">Members</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-[#00BCA2] cursor-pointer">Documentation</li>
                <li className="hover:text-[#00BCA2] cursor-pointer">Tutorials</li>
                <li className="hover:text-[#00BCA2] cursor-pointer">Events</li>
                <li className="hover:text-[#00BCA2] cursor-pointer">Contact Us</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Subscribe</h4>
              <div className="flex gap-2">
                <input type="email" placeholder="Enter your email" className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white w-full focus:outline-hidden focus:border-[#00BCA2]" />
                <Button size="sm" className="bg-[#00BCA2] text-black hover:bg-[#00BCA2]/90">Go</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-500">
            © 2026 ACM College Club. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatsCard({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-card border border-border/50 shadow-lg backdrop-blur-md">
      <div className="mb-4 p-3 bg-secondary/50 rounded-full">
        {icon}
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{label}</div>
    </div>
  )
}

function FeatureCard({ icon, title, description, color, bg }: { icon: React.ReactNode, title: string, description: string, color: string, bg: string }) {
  return (
    <div className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-[#00BCA2]/30 hover:shadow-lg transition-all duration-300">
      <div className={`h-12 w-12 rounded-lg ${bg} ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-[#00BCA2] transition-colors">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}
