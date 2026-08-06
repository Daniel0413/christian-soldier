import {
  Shield,
  Trophy,
  MessageSquare,
  Medal,
  BookOpen,
  Bell,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Daily Battle Reports",
      description:
        "Report your daily victory or defeat and strengthen your spiritual discipline.",
      icon: Shield,
    },
    {
      title: "Leaderboards",
      description:
        "See who is leading the battle through faithfulness and consistency.",
      icon: Trophy,
    },
    {
      title: "Barracks Chat",
      description:
        "Encourage fellow soldiers through real-time conversations.",
      icon: MessageSquare,
    },
    {
      title: "Rank Progress",
      description:
        "Earn promotions by remaining faithful in your daily battles.",
      icon: Medal,
    },
    {
      title: "Daily Bible Verse",
      description:
        "Receive Scripture every day to strengthen your walk with Christ.",
      icon: BookOpen,
    },
    {
      title: "Battle Notifications",
      description:
        "Never miss the 6 PM reporting time and important updates.",
      icon: Bell,
    },
  ];

  return (
    <section className="bg-[#0B1220] py-24 px-6">
      <div className="mx-auto max-w-7xl">

        <h2 className="text-center text-4xl font-bold text-[#D4AF37]">
          Features
        </h2>

        <p className="mt-4 text-center text-gray-400">
          Grow spiritually through discipline, accountability, and fellowship.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-xl border border-[#D4AF37]/20 bg-[#111827] p-8 transition duration-300 hover:border-[#D4AF37] hover:-translate-y-2"
              >
                <Icon className="mb-6 h-10 w-10 text-[#D4AF37]" />

                <h3 className="text-xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}