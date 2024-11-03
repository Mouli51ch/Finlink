// src/components/FinLinkLanding.tsx
// src/components/FinLinkLanding.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Wallet, 
  ArrowRight, 
  DollarSign, 
  Bitcoin, 
  BadgePercent, 
  Shield,
  ChevronDown,
  ArrowUpRight,
  Loader2,
  CheckCircle2,
  XCircle,
  Copy,
  ExternalLink,
  Check
} from 'lucide-react';


const FinLinkLanding = () => {
  // State management
  const [showLoanRequest, setShowLoanRequest] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [loanAmount, setLoanAmount] = useState('');
  const [selectedCollateral, setSelectedCollateral] = useState('BTC');
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [copied, setCopied] = useState(false);
  const [loanTerm, setLoanTerm] = useState('30');
  const [interestType, setInterestType] = useState('fixed');

  // Constants
  const cryptoRates = {
    BTC: { price: 64500, ltv: 0.7 },
    ETH: { price: 3200, ltv: 0.75 },
    SOL: { price: 140, ltv: 0.65 },
    USDC: { price: 1, ltv: 0.9 },
  };

  const features = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Instant Loans",
      description: "Get crypto-backed loans within minutes",
      stats: "Up to $1M"
    },
    {
      icon: <Bitcoin className="w-8 h-8" />,
      title: "Multi-Chain Support",
      description: "Support for major blockchain networks",
      stats: "10+ Chains"
    },
    {
      icon: <BadgePercent className="w-8 h-8" />,
      title: "Competitive Rates",
      description: "Market-leading interest rates",
      stats: "From 3% APR"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-grade security protocols",
      stats: "$100M+ Coverage"
    }
  ];

  // Handlers
  const handleConnectWallet = async () => {
    setIsConnecting(true);
    console.log('Connecting wallet...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsWalletConnected(true);
    setIsConnecting(false);
    console.log('Wallet connected');
  };

  const handleLoanSubmit = () => {
    console.log('Submitting loan request...');
    const mockTxHash = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
    setTransactionHash(mockTxHash);
    setShowSuccessMessage(true);
    console.log('Loan request submitted:', {
      amount: loanAmount,
      collateral: selectedCollateral,
      term: loanTerm,
      interestType: interestType,
      transactionHash: mockTxHash
    });
  };

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(transactionHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateMaxLoan = () => {
    const rate = cryptoRates[selectedCollateral as keyof typeof cryptoRates];
    if (!loanAmount || !rate) return 0;
    return (parseFloat(loanAmount) * rate.price * rate.ltv).toFixed(2);
  };

  const truncateAddress = (address: string, startLength: number = 6, endLength: number = 4): string => {
    if (!address) return '';
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
  };

  const resetForm = () => {
    setShowLoanRequest(false);
    setShowSuccessMessage(false);
    setCurrentStep(1);
    setLoanAmount('');
    setSelectedCollateral('BTC');
    setLoanTerm('30');
    setInterestType('fixed');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-overlay animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              background: `radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, transparent 70%)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            FinLink
          </div>
          <Button
            onClick={handleConnectWallet}
            disabled={isConnecting || isWalletConnected}
            className={`${
              isWalletConnected 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            } transition-all duration-300`}
          >
            {isConnecting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting</>
            ) : isWalletConnected ? (
              <><CheckCircle2 className="mr-2 h-4 w-4" /> Connected</>
            ) : (
              <><Wallet className="mr-2 h-4 w-4" /> Connect Wallet</>
            )}
          </Button>
        </div>
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              DeFi Lending
            </span>
            <br />
            <span className="text-white">Made Simple</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Bridge the gap between traditional finance and DeFi with our hybrid lending platform
          </p>
          <Button
            onClick={() => setShowLoanRequest(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 rounded-xl text-lg animate-pulse-slow"
          >
            Get Started <ArrowUpRight className="ml-2" />
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Total Value Locked', value: '$1.2B+' },
            { label: 'Active Users', value: '50,000+' },
            { label: 'Supported Chains', value: '10+' },
            { label: 'Success Rate', value: '99.9%' }
          ].map((stat, index) => (
            <Card 
              key={index}
              className="p-6 bg-white/5 backdrop-blur-sm border-transparent hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
              <div className="text-sm text-blue-200">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 bg-white/5 backdrop-blur-sm border-transparent hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-blue-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-blue-200 mb-4">
                {feature.description}
              </p>
              <div className="text-sm font-medium text-purple-400">
                {feature.stats}
              </div>
            </Card>
          ))}
        </div>

        {/* Loan Request Modal */}
        {showLoanRequest && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="bg-white/10 backdrop-blur-md text-white p-8 rounded-xl w-full max-w-md animate-slide-up relative modal-content">
              {showSuccessMessage ? (
                <div className="text-center py-8 animate-fade-in">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <CheckCircle2 className="w-16 h-16 text-green-500" />
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">Request Submitted!</h3>
                  <p className="text-gray-300 mb-6">Your loan request has been successfully submitted</p>
                  
                  <div className="bg-black/20 rounded-lg p-4 mb-6">
                    <div className="text-sm text-gray-400 mb-2">Transaction Hash</div>
                    <div className="flex items-center justify-between bg-black/30 rounded-lg p-3">
                      <code className="text-sm text-blue-400">
                        {truncateAddress(transactionHash)}
                      </code>
                      <div className="flex gap-2">
                        <button
                          onClick={handleCopyAddress}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                          title="Copy address"
                        >
                          {copied ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                        <a
                          href={`https://etherscan.io/tx/${transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                          title="View on Etherscan"
                        >
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm text-gray-300">
                      Loan amount: <span className="text-white font-medium">${calculateMaxLoan()}</span>
                    </p>
                    <p className="text-sm text-gray-300">
                      Collateral: <span className="text-white font-medium">{loanAmount} {selectedCollateral}</span>
                    </p>
                    <p className="text-sm text-gray-300">
                      Term: <span className="text-white font-medium">{loanTerm} days</span>
                    </p>
                    <p className="text-sm text-gray-300">
                      Rate type: <span className="text-white font-medium">{interestType}</span>
                    </p>
                  </div>
                  
                  <div className="mt-6 flex gap-4">
                    <Button
                      onClick={resetForm}
                      className="flex-1 bg-white/10 hover:bg-white/20"
                    >
                      Close
                    </Button>
                    <Button
                      onClick={() => window.open(`https://etherscan.io/tx/${transactionHash}`, '_blank')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      View Transaction
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Request a Loan</h2>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${currentStep >= 1 ? 'bg-blue-500' : 'bg-gray-500'}`} />
                      <div className={`w-3 h-3 rounded-full ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-500'}`} />
                      <div className={`w-3 h-3 rounded-full ${currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-500'}`} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {currentStep === 1 && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <label className="block text-sm font-medium mb-1">Collateral Type</label>
                          <select 
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white"
                            value={selectedCollateral}
                            onChange={(e) => setSelectedCollateral(e.target.value)}
                          >
                            <option value="BTC">Bitcoin (BTC)</option>
                            <option value="ETH">Ethereum (ETH)</option>
                            <option value="SOL">Solana (SOL)</option>
                            <option value="USDC">USD Coin (USDC)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Collateral Amount</label>
                          <input 
                            type="number" 
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white"
                            placeholder="Enter amount"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                          />
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg">
                          <div className="text-sm text-gray-300 mb-2">Maximum Loan Amount</div>
                          <div className="text-2xl font-bold">${calculateMaxLoan()}</div>
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <label className="block text-sm font-medium mb-1">Loan Term</label>
                          <select 
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(e.target.value)}
                          >
                            <option value="30">30 days</option>
                            <option value="90">90 days</option>
                            <option value="180">180 days</option>
                            <option value="360">360 days</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Interest Rate Type</label>
                          <select 
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white"
                            value={interestType}
                            onChange={(e) => setInterestType(e.target.value)}
                          >
                            <option value="fixed">Fixed Rate</option>
                            <option value="variable">Variable Rate</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="bg-white/5 p-4 rounded-lg space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Collateral</span>
                            <span className="font-medium">{loanAmount} {selectedCollateral}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Loan Amount</span>
                            <span className="font-medium">${calculateMaxLoan()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Term</span>
                            <span className="font-medium">{loanTerm} days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Interest Rate</span>
                            <span className="font-medium">3.5% APR</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4 mt-6">
                      {currentStep > 1 && (
                        <Button 
                          onClick={() => setCurrentStep(prev => prev - 1)}
                          className="flex-1 bg-white/10 hover:bg-white/20"
                        >
                          Back
                        </Button>
                      )}
                      <Button 
                        onClick={() => {
                          if (currentStep < 3) {
                            setCurrentStep(prev => prev + 1);
                          } else {
                            handleLoanSubmit();
                          }
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        {currentStep === 3 ? 'Submit Request' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }

        .modal-content {
          max-height: 90vh;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }

        .modal-content::-webkit-scrollbar {
          width: 6px;
        }

        .modal-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .modal-content::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default FinLinkLanding;