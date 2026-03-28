import Hero from '@/components/Hero';
import StorySection from '@/components/StorySection';
import HowItWorks from '@/components/HowItWorks';
import FAQ from '@/components/FAQ';
import TemplateSection from '@/components/TemplateSection';
import ThemeShowcase from '@/components/ThemeShowcase';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TemplateSection />
      <StorySection />
      <HowItWorks />
      <ThemeShowcase />
      <FAQ />
    </main>
  );
}
