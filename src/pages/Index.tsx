
import Header from '../components/Header';
import Hero from '../components/Hero';
import PromptInput from '../components/PromptInput';
import CurrentPlanBanner from '../components/CurrentPlanBanner';
import SubscriptionPlans from '../components/SubscriptionPlans';
import CommunityGallery from '../components/CommunityGallery';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <CurrentPlanBanner />
      </div>
      <PromptInput />
      <CommunityGallery />
      <SubscriptionPlans />
    </div>
  );
};

export default Index;
