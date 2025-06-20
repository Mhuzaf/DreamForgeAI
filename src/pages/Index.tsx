
import Header from '../components/Header';
import Hero from '../components/Hero';
import PromptInput from '../components/PromptInput';
import SubscriptionPlans from '../components/SubscriptionPlans';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <PromptInput />
      <SubscriptionPlans />
    </div>
  );
};

export default Index;
