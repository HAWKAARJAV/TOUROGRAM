import { motion } from 'framer-motion';
import { Check, X, Sparkles, Zap, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for casual travelers and story enthusiasts',
      icon: Sparkles,
      features: [
        { text: 'Read unlimited stories', included: true },
        { text: 'Share up to 5 stories/month', included: true },
        { text: 'Basic AI travel suggestions', included: true },
        { text: 'Community access', included: true },
        { text: 'Save up to 10 favorite stories', included: true },
        { text: 'Ad-supported experience', included: true },
        { text: 'Advanced AI trip planner', included: false },
        { text: 'Priority support', included: false },
        { text: 'Unlimited story uploads', included: false }
      ],
      cta: 'Get Started Free',
      popular: false,
      color: 'from-gray-500 to-gray-600'
    },
    {
      name: 'Premium',
      price: '$9.99',
      period: '/month',
      description: 'For passionate travelers who want more',
      icon: Zap,
      features: [
        { text: 'Everything in Free, plus:', included: true },
        { text: 'Unlimited story uploads', included: true },
        { text: 'Advanced AI trip planner', included: true },
        { text: 'Emotion-based recommendations', included: true },
        { text: 'Ad-free experience', included: true },
        { text: 'Save unlimited stories', included: true },
        { text: 'Early access to new features', included: true },
        { text: 'Download stories offline', included: true },
        { text: 'Priority support', included: false }
      ],
      cta: 'Start Premium Trial',
      popular: true,
      color: 'from-primary to-primary-glow'
    },
    {
      name: 'Pro',
      price: '$19.99',
      period: '/month',
      description: 'For content creators and travel professionals',
      icon: Crown,
      features: [
        { text: 'Everything in Premium, plus:', included: true },
        { text: 'Verified creator badge', included: true },
        { text: 'Analytics dashboard', included: true },
        { text: 'Monetization options', included: true },
        { text: 'Custom profile page', included: true },
        { text: 'Priority support (24/7)', included: true },
        { text: 'Collaboration tools', included: true },
        { text: 'API access', included: true },
        { text: 'White-label options', included: true }
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'from-accent to-pink-500'
    }
  ];

  return (
    <main className="pt-24 pb-20 min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
            FLEXIBLE PRICING
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-gray-900 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Start free and upgrade as your storytelling journey grows. All plans include access to our global community.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-primary to-accent text-white text-sm font-bold rounded-full shadow-lg z-10">
                    MOST POPULAR
                  </div>
                )}
                
                <div className={`h-full bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${plan.popular ? 'border-primary' : 'border-gray-100'}`}>
                  {/* Header */}
                  <div className={`p-8 bg-gradient-to-r ${plan.color} text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-10 h-10" />
                      <div className="text-right">
                        <div className="text-4xl font-bold">{plan.price}</div>
                        <div className="text-sm opacity-90">{plan.period}</div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-white/90 text-sm">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <div className="p-8">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-accent hover:shadow-xl' : 'bg-gray-900 hover:bg-gray-800'} text-white font-semibold py-6 rounded-xl transition-all duration-300`}
                      onClick={() => navigate('/register')}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-lg mb-3">Can I cancel anytime?</h3>
              <p className="text-gray-600">Yes! You can cancel your subscription at any time. Your access will continue until the end of your billing period.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-lg mb-3">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, PayPal, and Apple Pay for your convenience.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-lg mb-3">Is there a free trial?</h3>
              <p className="text-gray-600">Premium users get a 14-day free trial. No credit card required to start.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-lg mb-3">Can I upgrade or downgrade later?</h3>
              <p className="text-gray-600">Absolutely! You can change your plan at any time from your account settings.</p>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div 
          className="mt-20 text-center bg-gradient-to-r from-primary to-accent text-white p-12 rounded-3xl shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-white/90 mb-6">Our team is here to help you find the perfect plan</p>
          <Button
            variant="outline"
            className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-6 rounded-xl"
            onClick={() => navigate('/contact-us')}
          >
            Contact Sales
          </Button>
        </motion.div>
      </div>
    </main>
  );
};

export default Pricing;
