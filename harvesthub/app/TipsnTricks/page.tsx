"use client";

import { ChangeEvent, useState, useEffect } from "react";
import Header from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { gardeningTipsType, renderTips } from "./renderTips";

export default function TipsnTricks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTips, setFilteredTips] = useState([]);
  const gardeningTips = [
    {
      id: 1,
      title: "6 vegetable gardening tips every new food gardener needs to know",
      description:
        "In recent weeks, the rapidly increasing cost of vegetables, like cauliflower ($8.99 at my local grocery store!), has made headlines across North America. With food prices expected to continue to rise in the near future, more homeowners are turning to veggie gardens to offset the price of groceries. For those who are new to gardening – or at least new to food gardening – here are six vegetable gardening tips to get you started.",
      author: "Niki Jabbour",
    },
    {
      id: 2,
      title: "Let there be light",
      description:
        "Most veggies, especially those that bear fruit (tomatoes, cucumbers, squash, and peppers, for example) need sun, and a lot of it. Ideally, you want a site with at least 8 hours of direct sun per day. In less light, you can still grow some edibles; mainly leafy crops and herbs.",
      author: "Niki Jabbour",
    },
    {
      id: 3,
      title: "Soil is everything",
      description:
        "Healthy, rich soil is the key to a successful and productive vegetable garden, so don't skip this step! A soil test will give you an idea of your existing soil fertility and pH, and offer suggestions of what types of fertilizers or amendments will get your plot up to par. In my own garden, I rely on homemade compost, organic well-composted animal manures, and organic fertilizers like kelp meal and alfalfa meal.",
      author: "Niki Jabbour",
    },
    {
      id: 4,
      title: "Keep it small",
      description:
        "A vegetable garden can be low-maintenance, but it's not no-maintenance. Therefore, do yourself a favor and stick to a small plot for the first year or two. A 4 by 8 foot bed is ideal for a starter veggie garden and will give you enough space to grow a handful of crops.",
      author: "Niki Jabbour",
    },
    {
      id: 5,
      title: "Pick your plants",
      description:
        "With your first veggie garden, it's very tempting to want to grow everything! But, for your own sake, I'd suggest you pick 4 to 5 types of vegetables and grow them well.",
      author: "Niki Jabbour",
    },
    {
      id: 6,
      title: "Bring on the blooms",
      description:
        "Most bugs are your friends! Think bees, butterflies, tachinid flies, ladybugs and more! To attract these good guys to your garden – and boost crop pollination – include clumps of insect-friendly plants like sweet alyssum, zinnias, cosmos, and sunflowers between the veggies and herbs.",
      author: "Niki Jabbour",
    },
    {
      id: 7,
      title: "Water, weed & feed",
      description:
        "This might seem to be one of the most obvious vegetable gardening tips, but new veggie gardeners may not know when or how much to water. Newly seeded beds will need frequent watering, but most established crops can get by on one to two inches of water per week.",
      author: "Niki Jabbour",
    },
  ];

  useEffect(() => {
    const tips: any = gardeningTips.filter((tip) =>
      tip.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTips(tips);
  }, [searchTerm]);

  return (
    <div>
      <Header title="Tips and Tricks" />
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {renderTips(filteredTips)}
    </div>
  );
}
