"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useGameStore } from "@/store/useGameStore";
import { User } from "@supabase/supabase-js";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { setProfileFromSupabase } = useGameStore();

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    // 1. Initial Session Check
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (user) {
        // Fetch user profile from PostgreSQL table
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (profile) {
          setProfileFromSupabase({
            username: profile.username,
            level: profile.level,
            rankTitle: profile.rank_title,
            currentXP: profile.current_xp,
            nextLevelXP: profile.next_level_xp,
            coins: profile.coins,
            streakDays: profile.streak_days,
          });
        }
      }

      setLoading(false);
    };

    checkUser();

    // 2. Real-time Auth State Subscription
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);

      if (currentUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", currentUser.id)
          .single();

        if (profile) {
          setProfileFromSupabase({
            username: profile.username,
            level: profile.level,
            rankTitle: profile.rank_title,
            currentXP: profile.current_xp,
            nextLevelXP: profile.next_level_xp,
            coins: profile.coins,
            streakDays: profile.streak_days,
          });
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setProfileFromSupabase]);

  return <>{children}</>;
}
