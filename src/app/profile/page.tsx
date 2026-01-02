import DashboardLayout from '@/components/DashboardLayout'
import { Award, Calendar, Flame, Mail, Shield, TrendingUp, Trophy, User, Zap } from 'lucide-react'
import { getProfile } from '../../../actions/profiles';
import { createClient } from '@/lib/supabase/server';
import { Progress } from '@/components/ui/progress';
import { getUserBadgeCount, getUserBadges } from '../../../actions/userBadges';
import { getPortfolioReturn } from '../../../actions/portfolios';
import { StatCard } from '@/components/ui/statCard';
import { cn } from '@/lib/utils';
import { getBadgeById } from '../../../actions/badges';
import Image from 'next/image';
import EditProfileButton from './_components/EditProfileButton';

export default async function ProfilePage () {
    // fetch user details 
    const supabase = await createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();
    if (error || !user) return <div>Not authenticated</div>;

    // format the joining date 
    const joinDate = new Date(user.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    // fetch user profile 
    let profile;
    try {
        profile = await getProfile();
    } catch (err) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold">Not authenticated</h2>
            </div>
        )
    }

    // Fetch user badges count 
    const userBadges = await getUserBadges();

    const experienceLevels = [
        { level: "Beginner", range: "0 - 1,000 XP", min: 0, max: 1000 },
        { level: "Intermediate", range: "1,001 - 5,000 XP", min: 1001, max: 5000 },
        { level: "Advanced", range: "5,001 - 15,000 XP", min: 5001, max: 15000 },
        { level: "Expert", range: "15,001+ XP", min: 15001, max: Infinity },
    ];

    // fetch every badge detail in parallel
    const earnedBadges = await Promise.all(
        userBadges.map(async (ub) => {
        const badge = await getBadgeById(ub.badge_id);
        return {
            ...ub,
            badge
        };
        })
    );
    const totalBadges = await getUserBadgeCount();

    // Progress Bar 
    const levelProgress = ((profile.xp - 2000) / (3000 - 2000)) * 100;

    const pnl = await getPortfolioReturn(profile.selected_portfolio_id);
    const returns = pnl.return_percent;

  return (
    <DashboardLayout>
        <div className='space-y-6 sm:space-y-8'>
            {/* Header Card */}
            <div className='glass-card p-6 sm:p-8'>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center">
                            {/* <User className="w-12 h-12 text-primary" /> */}
                            <Image 
                                src={profile.avatar_url} 
                                alt='avatar'
                                width={90}
                                height={90}
                                className="w-full h-full rounded-2xl text-primary"
                            />
                        </div>
                        <EditProfileButton profile={profile} />
                    </div>

                    <div className="flex-1">
                        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">{profile.username}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                {user.email}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Joined {joinDate}
                            </span>
                        </div>

                        {/* Level Progress */}
                        <div className="mt-4">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Level {profile.level}</span>
                                <span className="text-primary">{profile.xp} / 3000 XP</span>
                            </div>
                            <Progress value={levelProgress} className="h-3" />
                            <p className="text-xs text-muted-foreground mt-1">
                                {3000 - profile.xp} XP to next level
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatCard
                    icon={<Zap className="w-6 h-6 text-primary" />}
                    value={profile.xp}
                    label="XP Points"
                />

                <StatCard
                    icon={<Flame className="w-6 h-6 text-orange-500" />}
                    value={profile.current_streak}
                    label="Day Streak"
                />

                <StatCard
                    icon={<Trophy className="w-6 h-6 text-yellow-500" />}
                    value={totalBadges}
                    label="Badges Earned"
                />

                <StatCard
                    icon={
                    <TrendingUp
                        className={`w-6 h-6 ${
                        returns > 0
                            ? "text-green-500"
                            : returns < 0
                            ? "text-red-500"
                            : "text-muted-foreground"
                        }`}
                    />
                    }
                    value={
                    returns > 0
                        ? `+${returns}%`
                        : returns < 0
                        ? `${returns}%`
                        : `0%`
                    }
                    label="Returns"
                    valueClass={
                    returns > 0
                        ? "text-green-500"
                        : returns < 0
                        ? "text-red-500"
                        : "text-muted-foreground"
                    }
                />
            </div>

            {/* Badges Section */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-lg font-semibold">Badges</h2>
                    <Award className="w-5 h-5 text-primary" />
                </div>

                {earnedBadges.length === 0 ? (
                    <div className="text-center py-6 border border-dashed rounded-xl bg-muted/20">
                    <Award className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="font-medium">No badges earned yet</p>
                    <p className="text-sm text-muted-foreground">
                        Keep trading and unlock achievements!
                    </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {earnedBadges.map((item) => {
                        const { badge } = item;
                        if (!badge) return null;

                        return (
                        <div
                            key={item.id}
                            className="p-4 rounded-xl border bg-card hover:bg-primary/10 transition-all text-center"
                        >
                            <div className="text-4xl mb-2">{badge.icon}</div>

                            <p className="font-semibold text-sm truncate">
                            {badge.title}
                            </p>

                            <p className="text-[11px] text-muted-foreground mt-1">
                            Earned on {new Date(item.earned_at).toLocaleDateString()}
                            </p>
                        </div>
                        );
                    })}
                    </div>
                )}
            </div>

            {/* Experience Level */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-lg font-semibold">Experience Level</h2>
                    <Shield className="w-5 h-5 text-primary" />
                </div>

                <div className="grid sm:grid-cols-4 gap-4">
                    {experienceLevels.map((lvl, index) => {
                    const isCurrent = profile.xp >= lvl.min && profile.xp <= lvl.max;

                    return (
                        <div
                        key={index}
                        className={cn(
                            "p-4 rounded-xl text-center transition-all",
                            isCurrent
                            ? "bg-primary/10 border-2 border-primary"
                            : "bg-secondary/30"
                        )}
                        >
                        <p className={cn("font-semibold", isCurrent && "text-primary")}>
                            {lvl.level}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{lvl.range}</p>

                        {isCurrent && (
                            <span className="inline-block mt-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                            Current
                            </span>
                        )}
                        </div>
                    );
                    })}
                </div>
            </div>

        </div>
    </DashboardLayout>
  )
}