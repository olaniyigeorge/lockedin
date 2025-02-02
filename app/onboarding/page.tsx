import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
      default: "Join Us At LockedIn ",
      template: "%s | LockedIn",
    },
    description:
      "Stay on top of your goals with LockedIn, the ultimate habit and daily routine tracker. Designed to help you build lasting habits, this intuitive app enables users to set, track, and monitor their daily routines with ease. Whether you're aiming to develop better habits, stay consistent, or improve your productivity, LockedIn is your go-to tool for self-improvement. With a clean and user-friendly interface, it helps you stay focused, motivated, and on track towards achieving your long-term objectives. Download today and unlock your full potential! ",
  };
  


export default async function Onboarding() {
    return (
        <div className="onboarding-container">
            <h1 className="onboarding-title">LockedIn: The Habit Tracker for True Commitment</h1>
            <section className="onboarding-section">
                <h2 className="onboarding-subtitle">Overview</h2>
                <p className="onboarding-text">LockedIn is a <strong>habit-tracking system</strong> designed to help users <strong>commit deeply to their personal and professional growth</strong>. Unlike traditional habit trackers, LockedIn ensures accountability through <strong>gamification, commitment contracts, and AI-powered insights</strong> to drive long-term behavior change.</p>
            </section>
            <section className="onboarding-section">
                <h2 className="onboarding-subtitle">Why LockedIn?</h2>
                <h3 className="onboarding-subheading">1. Accountability That Sticks</h3>
                <ul className="onboarding-list">
                    <li className="onboarding-list-item"><strong>Penalties & Rewards</strong>: Users commit to habits with consequences for failure and incentives for success.</li>
                    <li className="onboarding-list-item"><strong>Social & Financial Tools</strong>: Public pledges, buddy systems, or monetary stakes make quitting harder.</li>
                </ul>
                <h3 className="onboarding-subheading">2. AI-Powered Habit Insights</h3>
                <ul className="onboarding-list">
                    <li className="onboarding-list-item"><strong>Behavior Analysis</strong>: AI identifies patterns (e.g., optimal habit times) and suggests improvements.</li>
                    <li className="onboarding-list-item"><strong>Personalized Reinforcement</strong>: Adaptive reminders and nudges tailored to user behavior.</li>
                </ul>
                <h3 className="onboarding-subheading">3. Gamification & Streak Protection</h3>
                <ul className="onboarding-list">
                    <li className="onboarding-list-item"><strong>XP, Badges & Leaderboards</strong>: Earn rewards for consistency and compete with others.</li>
                    <li className="onboarding-list-item"><strong>Safety Nets</strong>: Protect streaks by rescheduling missed habits in advance.</li>
                </ul>
                <h3 className="onboarding-subheading">4. Deep Integration with Productivity Tools</h3>
                <ul className="onboarding-list">
                    <li className="onboarding-list-item"><strong>Sync with Apps</strong>: Calendars, fitness trackers, Notion, and more via API support.</li>
                </ul>
            </section>
            <section className="onboarding-section">
                <h2 className="onboarding-subtitle">User Journey</h2>
                <h3 className="onboarding-subheading">1. Set a Habit</h3>
                <p className="onboarding-text">Define habit details: frequency (daily/weekly), duration, and commitment level (casual/serious).</p>
                <h3 className="onboarding-subheading">2. Lock It In</h3>
                <p className="onboarding-text">Choose accountability mechanisms:</p>
                <ul className="onboarding-list">
                    <li className="onboarding-list-item"><strong>Social</strong>: Share progress with a buddy or publicly.</li>
                    <li className="onboarding-list-item"><strong>Financial</strong>: Pledge money (refundable upon success).</li>
                    <li className="onboarding-list-item"><strong>Personal</strong>: Custom penalties (e.g., donate to a disliked cause if you fail).</li>
                </ul>
                <h3 className="onboarding-subheading">3. Track & Adapt</h3>
                <p className="onboarding-text">AI adjusts reminders and schedules based on progress. View analytics (e.g., consistency heatmaps) to refine habits.</p>
                <h3 className="onboarding-subheading">4. Earn & Level Up</h3>
                <p className="onboarding-text">Unlock badges, XP, and achievements. Climb leaderboards or join challenges for extra motivation.</p>
            </section>
            <section className="onboarding-section">
                <h2 className="onboarding-subtitle">Pitch Deck Structure (UI/UX Designer Meeting)</h2>
                <h3 className="onboarding-subheading">1. Introduction</h3>
                <p className="onboarding-text"><strong>Vision</strong>: <em>&ldquo;LockedIn is more than a habit tracker; it&rsquo;s a commitment system.&rdquo;</em></p>
                <p className="onboarding-text"><strong>Problem</strong>: Highlight the 80% abandonment rate of traditional trackers due to weak accountability.</p>
                <h3 className="onboarding-subheading">2. Core Features & Differentiation</h3>
                <p className="onboarding-text">Contrast LockedIn&quot;s <strong>commitment contracts</strong> and <strong>AI insights</strong> with basic trackers like Habitica or Streaks. Show mockups of key interactions (habit setup, penalty selection, streak protection).</p>
                <h3 className="onboarding-subheading">3. Design Philosophy</h3>
                <p className="onboarding-text"><strong>Simplicity</strong>: Clean interface with progress visualized as a "lock" that strengthens with consistency.</p>
                <p className="onboarding-text"><strong>Engagement</strong>: Bold CTAs, progress animations, and celebratory micro-interactions.</p>
                <p className="onboarding-text"><strong>Behavioral Science</strong>: Leverage loss aversion (e.g., “Don&quot;t break the chain!” warnings).</p>
                <h3 className="onboarding-subheading">4. Onboarding Goals for UI/UX</h3>
                <p className="onboarding-text"><strong>Habit Setup Flow</strong>: Minimize steps; use progressive disclosure for commitment options.</p>
                <p className="onboarding-text"><strong>Gamification UI</strong>: Design XP bars and badges to feel rewarding but not distracting.</p>
                <p className="onboarding-text"><strong>Commitment Visualization</strong>: Icons for social/financial/personal stakes (e.g., a money icon for financial pledges).</p>
            </section>
            <section className="onboarding-section">
                <h2 className="onboarding-subtitle">Visual Pitch for LockedIn</h2>
                <h3 className="onboarding-subheading">Slide 1: The Problem</h3>
                <p className="onboarding-text"><strong>Image</strong>: A person scrolling through a habit tracker app with broken streaks.</p>
                <p className="onboarding-text"><strong>Stat</strong>: <em>“80% abandon habit trackers within a month. Why? No real consequences.”</em></p>
                <h3 className="onboarding-subheading">Slide 2: The Solution - LockedIn</h3>
                <p className="onboarding-text"><strong>Mockup</strong>: Habit creation screen with options for social/financial commitments.</p>
                <p className="onboarding-text"><strong>Tagline</strong>: <em>&ldquo;Stay LockedIn. Stay Accountable. Build Lasting Habits.&rdquo;</em></p>
                <h3 className="onboarding-subheading">Slide 3: User Experience Flow</h3>
                <p className="onboarding-text"><strong>Visual Flow</strong>:</p>
                <ol className="onboarding-list">
                    <li className="onboarding-list-item">Set Habit</li>
                    <li className="onboarding-list-item">Choose Accountability</li>
                    <li className="onboarding-list-item">Track with AI</li>
                    <li className="onboarding-list-item">Earn Rewards</li>
                </ol>
                <p className="onboarding-text"><strong>Gamification</strong>: Show badges, XP pop-ups, and a leaderboard snippet.</p>
                <h3 className="onboarding-subheading">Slide 4: AI & Analytics</h3>
                <p className="onboarding-text"><strong>Mockup</strong>: Dashboard with insights like <em>&quot;You&quot;re 30% more consistent after 8 PM. Adjust schedule?”</em></p>
                <h3 className="onboarding-subheading">Slide 5: Competitive Edge</h3>
                <p className="onboarding-text"><strong>Comparison Table</strong>: LockedIn vs. competitors, highlighting <strong>accountability</strong> and <strong>integration</strong> features.</p>
                <h3 className="onboarding-subheading">Slide 6: Call to Action for UI/UX</h3>
                <p className="onboarding-text"><strong>Question</strong>: <em>“How do we design an experience that makes users feel truly &quot;LockedIn&quot;?”</em></p>
                <p className="onboarding-text"><strong>Next Steps</strong>: Brainstorm onboarding flows, gamification UI, and commitment visualizations.</p>
            </section>
            <section className="onboarding-section">
                <p className="onboarding-text"><strong>Final Note</strong>: LockedIn&quot;s success hinges on balancing <strong>enforcement</strong> and <strong>empathy</strong>. The design must feel supportive, not punitive, while ensuring users take their commitments seriously.</p>
            </section>
        </div>
    )
}
