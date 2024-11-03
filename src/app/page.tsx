// src/app/page.tsx
'use client'

// Remove the comment "// src/app/page.tsx" as it's not needed
import { useEffect, useState } from 'react'
import { 
  Wallet, 
  ArrowRight, 
  Coins, 
  Binary,
  BarChart3,
  ShieldCheck,
  Globe,
  CheckCircle2,
  Check,
  Copy,
  ExternalLink,
  Loader2 
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function Home() {
  // State management
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLoanRequest, setShowLoanRequest] = useState(false)
  const [animatedValue, setAnimatedValue] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [transactionHash, setTransactionHash] = useState('')
  const [copied, setCopied] = useState(false)
  const [loanAmount, setLoanAmount] = useState('')
  const [collateralType, setCollateralType] = useState('BTC')
  const [isWalletConnecting, setIsWalletConnecting] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [walletCopied, setWalletCopied] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setAnimatedValue(prev => {
        if (prev < 100) return prev + 1
        clearInterval(interval)
        return 100
      })
    }, 20)
    return () => clearInterval(interval)
  }, [])

  // Helper functions
  const generateRandomAddress = () => {
    const chars = '0123456789abcdef'
    let address = '0x'
    for (let i = 0; i < 40; i++) {
      address += chars[Math.floor(Math.random() * chars.length)]
    }
    return address
  }

  const handleConnectWallet = async () => {
    if (isWalletConnected) return
    
    setIsWalletConnecting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const randomAddress = generateRandomAddress()
    setWalletAddress(randomAddress)
    setIsWalletConnected(true)
    setIsWalletConnecting(false)
  }

  const handleSubmit = async () => {
    if (!isWalletConnected) {
      alert('Please connect your wallet first')
      return
    }
    
    const mockTxHash = generateRandomAddress()
    setTransactionHash(mockTxHash)
    setShowSuccess(true)
  }

  const handleCopyWallet = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await navigator.clipboard.writeText(walletAddress)
    setWalletCopied(true)
    setTimeout(() => setWalletCopied(false), 2000)
  }

  const handleCopyTx = async () => {
    await navigator.clipboard.writeText(transactionHash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const resetForm = () => {
    setShowLoanRequest(false)
    setShowSuccess(false)
    setLoanAmount('')
    setCollateralType('BTC')
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const features = [
    {
      icon: <Coins className="w-6 h-6" />,
      title: "Crypto-Backed Loans",
      description: "Use your crypto as collateral for instant fiat loans"
    },
    {
      icon: <Binary className="w-6 h-6" />,
      title: "Smart Contracts",
      description: "Fully automated and secure lending protocols"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Dynamic Rates",
      description: "Market-driven interest rates for optimal returns"
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Bank-Grade Security",
      description: "Multi-layer security with insurance coverage"
    }
  ]
  return (
    <main className={`min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white relative overflow-hidden ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
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

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-block">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4 animate-slide-down">
                <Globe className="w-4 h-4" />
                <span className="text-sm">Revolutionizing DeFi Lending</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-slide-up">
              Welcome to FinLink
            </h1>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in opacity-90">
              Bridge the gap between traditional finance and DeFi with our hybrid lending platform
            </p>

            <div className="flex flex-wrap justify-center gap-4 animate-slide-up">
              <Button 
                onClick={() => setShowLoanRequest(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-lg transition-transform hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2" />
              </Button>
              
              <Button 
                onClick={handleConnectWallet}
                disabled={isWalletConnecting}
                className={`
                  px-8 py-6 rounded-xl text-lg transition-all duration-300
                  ${isWalletConnected 
                    ? 'bg-green-600/30 hover:bg-green-600/40' 
                    : 'bg-purple-600/30 hover:bg-purple-600/40'
                  } backdrop-blur-sm hover:scale-105
                `}
              >
                {isWalletConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Connecting...
                  </>
                ) : isWalletConnected ? (
                  <div className="flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                    <span className="font-mono text-sm">
                      {truncateAddress(walletAddress)}
                    </span>
                    <button
                      onClick={handleCopyWallet}
                      className="ml-2 p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      {walletCopied ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                ) : (
                  <>
                    <Wallet className="mr-2 h-5 w-5" />
                    Connect Wallet
                  </>
                )}
              </Button>
            </div>

            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-center animate-fade-in">
              {[
                ['$100M+', 'Total Volume'],
                ['50K+', 'Active Users'],
                [`${animatedValue}ms`, 'Avg. Response'],
                ['99.9%', 'Uptime']
              ].map(([value, label]) => (
                <div key={label} className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-blue-400">{value}</div>
                  <div className="text-sm text-blue-200">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="p-6 bg-white/5 backdrop-blur-sm border-transparent hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'slide-up 0.5s ease-out forwards'
              }}
            >
              <div className="text-blue-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-blue-200 text-sm">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Loan Request Modal */}
      {showLoanRequest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <Card className="bg-white/10 backdrop-blur-md text-white p-8 rounded-xl w-full max-w-md animate-slide-up">
            {showSuccess ? (
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
                        onClick={handleCopyTx}
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
                
                <div className="space-y-3 mb-6">
                  <p className="text-sm text-gray-300">
                    Loan amount: <span className="text-white font-medium">${loanAmount}</span>
                  </p>
                  <p className="text-sm text-gray-300">
                    Collateral: <span className="text-white font-medium">{collateralType}</span>
                  </p>
                </div>
                
                <div className="flex gap-4">
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
                <h2 className="text-2xl font-bold mb-6">Request a Loan</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Loan Amount</label>
                    <input 
                      type="number" 
                      className="w-full p-2 rounded-lg bg-white/5 border border-white/20 text-white"
                      placeholder="Enter amount"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Collateral Type</label>
                    <select 
                      className="w-full p-2 rounded-lg bg-white/5 border border-white/20 text-white"
                      value={collateralType}
                      onChange={(e) => setCollateralType(e.target.value)}
                    >
                      <option value="BTC">Bitcoin (BTC)</option>
                      <option value="ETH">Ethereum (ETH)</option>
                      <option value="USDC">USD Coin (USDC)</option>
                      <option value="USDT">Tether (USDT)</option>
                    </select>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <Button 
                      onClick={() => setShowLoanRequest(false)}
                      className="flex-1 bg-white/10 hover:bg-white/20"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSubmit}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      Submit Request
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-bounce {
          animation: bounce 1s infinite;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </main>
  )
}

export default Home;