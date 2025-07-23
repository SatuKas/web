import CtaSection from '@/components/module/landingPage/CtaSection';
import FeatureSection from '@/components/module/landingPage/FeatureSection';
import Footer from '@/components/module/landingPage/Footer';
import Header from '@/components/module/landingPage/Header';
import HeroSection from '@/components/module/landingPage/HeroSection';
import Stack from '@/components/ui/Stack';

const LandingPage = () => {
  return (
    <Stack className="min-h-screen w-full">
      {/* Header */}
      <Header />
      <Stack as="main" gap={4} className="mx-auto max-w-screen-2xl px-4 relative py-12 md:py-17">
        {/* Hero */}
        <HeroSection />

        {/* Features */}
        <FeatureSection />

        {/* CTA */}
        <CtaSection />

        {/* Footer */}
        <Footer />
      </Stack>
    </Stack>
  );
};

export default LandingPage;
