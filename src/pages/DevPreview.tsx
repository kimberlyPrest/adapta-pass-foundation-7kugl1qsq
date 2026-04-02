import { SectionTitle } from '@/components/ui/section-title'
import { StatCard } from '@/components/ui/stat-card'
import { BadgeASA } from '@/components/ui/badge-asa'
import { HealthDot } from '@/components/ui/health-dot'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Activity, Users, Target, Zap } from 'lucide-react'

export default function DevPreview() {
  return (
    <div className="space-y-12 pb-12">
      <section>
        <SectionTitle title="Typography Showcase" subtitle="Syne for headings, DM Sans for body" />
        <div className="space-y-4 rounded-xl border bg-card p-6">
          <h1 className="font-display text-4xl font-bold">Heading 1 - Syne Bold</h1>
          <h2 className="font-display text-3xl font-bold">Heading 2 - Syne Bold</h2>
          <h3 className="font-display text-2xl font-bold">Heading 3 - Syne Bold</h3>
          <p className="text-base text-foreground">
            This is regular body text using DM Sans. The ADAPTA PASS application is a robust,
            dark-first enterprise foundation.
          </p>
          <p className="text-sm text-muted-foreground">
            This is muted small text, useful for secondary descriptions.
          </p>
        </div>
      </section>

      <section>
        <SectionTitle title="StatCards" subtitle="Overview of key metrics" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<Users className="h-5 w-5 text-primary" />}
            title="Total Clients"
            value="1,248"
            trend={{ value: 12.5, direction: 'up' }}
          />
          <StatCard
            icon={<Activity className="h-5 w-5 text-secondary" />}
            title="Active Projects"
            value="42"
            trend={{ value: 4.1, direction: 'up' }}
          />
          <StatCard
            icon={<Target className="h-5 w-5 text-[hsl(280,70%,55%)]" />}
            title="Completion Rate"
            value="89%"
            trend={{ value: 2.4, direction: 'down' }}
          />
          <StatCard
            icon={<Zap className="h-5 w-5 text-destructive" />}
            title="Critical Issues"
            value="3"
            trend={{ value: 0, direction: 'neutral' }}
          />
        </div>
      </section>

      <section>
        <SectionTitle title="Badges & Indicators" subtitle="BadgeASA and HealthDots" />
        <div className="flex flex-col gap-6 rounded-xl border bg-card p-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium w-24">ASA Badges:</span>
            <BadgeASA type="Amplificar" />
            <BadgeASA type="Sistematizar" />
            <BadgeASA type="Automatizar" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium w-24">Health Dots:</span>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <HealthDot status="Green" tooltipText="Saudável" /> Green
              </div>
              <div className="flex items-center gap-2">
                <HealthDot status="Yellow" tooltipText="Atenção" /> Yellow
              </div>
              <div className="flex items-center gap-2">
                <HealthDot status="Red" tooltipText="Crítico" /> Red
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle title="Progress Bars" subtitle="Animated on mount" />
        <div className="space-y-6 rounded-xl border bg-card p-6 w-full max-w-md">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Phase 1</span>
              <span>25%</span>
            </div>
            <ProgressBar value={25} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Phase 2</span>
              <span>60%</span>
            </div>
            <ProgressBar value={60} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Phase 3</span>
              <span>95%</span>
            </div>
            <ProgressBar value={95} />
          </div>
        </div>
      </section>
    </div>
  )
}
