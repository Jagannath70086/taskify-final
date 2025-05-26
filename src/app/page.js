import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  ListTodo,
  Calendar,
  BarChart4,
} from "lucide-react";

export default function Home() {

  const features = [
    {
      icon: <ListTodo className="h-6 w-6" />,
      title: "Track Your Tasks",
      description:
        "Easily manage your todos with detailed tracking including title, description, and deadlines.",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Stay Organized",
      description:
        "View your in-progress tasks and catch expired ones before it's too late.",
    },
    {
      icon: <BarChart4 className="h-6 w-6" />,
      title: "Track Your Progress",
      description:
        "Monitor your productivity with our activity tracking feature.",
    },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute top-40 left-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
            
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, #4f46e5 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pt-20 pb-32">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
            <div className="md:w-1/2 text-left space-y-6 md:pr-8 mb-10 md:mb-0 z-10">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-200 dark:border-blue-800">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2"></span>
                  Task Management Reimagined
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Simplify your 
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400"> workflow</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                Taskify helps you organize tasks, track progress, and achieve your goals with a beautiful, intuitive interface.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                <Link
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all duration-300"
                  href={"/register"}
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  className="px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300"
                  href={"/login"}
                >
                  Sign In
                </Link>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span>✓ No credit card required</span>
                <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                <span>✓ Free plan available</span>
              </div>
            </div>
            
            <div className="md:w-1/2 relative z-10">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/5 overflow-hidden border border-slate-100 dark:border-slate-700">
                <div className="h-8 bg-slate-100 dark:bg-slate-700 flex items-center px-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <div className="h-6 w-32 bg-slate-200 dark:bg-slate-600 rounded mb-4"></div>
                    <div className="flex gap-2 mb-1">
                      <div className="h-4 w-4 bg-blue-500 rounded"></div>
                      <div className="h-4 w-24 bg-slate-200 dark:bg-slate-600 rounded"></div>
                    </div>
                    <div className="flex gap-2 mb-1">
                      <div className="h-4 w-4 bg-green-500 rounded"></div>
                      <div className="h-4 w-36 bg-slate-200 dark:bg-slate-600 rounded"></div>
                    </div>
                    <div className="flex gap-2 mb-1">
                      <div className="h-4 w-4 bg-slate-300 dark:bg-slate-500 rounded"></div>
                      <div className="h-4 w-28 bg-slate-200 dark:bg-slate-600 rounded"></div>
                    </div>
                  </div>
                  
                  <div className="h-20 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-3">
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-600 rounded mb-2 opacity-60"></div>
                    <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-600 rounded opacity-60"></div>
                  </div>
                  
                  <div className="h-20 bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-600 rounded mb-2 opacity-40"></div>
                    <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-600 rounded opacity-40"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-400/20 rounded-full blur-xl"></div>
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"></div>
              
              <div className="absolute -bottom-2 -left-12 bg-white dark:bg-slate-800 rounded-lg p-3 shadow-lg border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Task completed!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to stay productive
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Powerful features to help you manage tasks efficiently
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-2 shadow-2xl shadow-blue-500/20">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Start organizing your life today</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                      Join thousands of users who have transformed their productivity with our intuitive task management solution.
                    </p>
                    <ul className="space-y-3 mb-8">
                      {[
                        "Intuitive task organization",
                        "Smart deadline reminders",
                        "Progress tracking and analytics",
                        "Cloud sync across all devices"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                      href={"/register"}
                    >
                      Create Free Account <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  
                  <div className="relative">
                    <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 shadow-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-lg font-semibold">My Tasks</div>
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <ListTodo className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      
                      {[
                        { name: "Redesign homepage", complete: true },
                        { name: "Meeting with design team", complete: false },
                        { name: "Finish project proposal", complete: false },
                        { name: "Weekly team sync", complete: false }
                      ].map((task, i) => (
                        <div 
                          key={i}
                          className="flex items-center gap-3 p-3 rounded-lg mb-2 bg-white dark:bg-slate-800"
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${task.complete ? 'bg-green-500 border-green-500' : 'border-slate-300 dark:border-slate-600'}`}>
                            {task.complete && <CheckCircle className="h-4 w-4 text-white" />}
                          </div>
                          <span className={task.complete ? 'line-through text-slate-400' : ''}>{task.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-blue-600 to-violet-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get organized?</h2>
            <p className="text-xl opacity-90 mb-8">
              Start your free trial today. No credit card required.
            </p>
            <Link
              className="px-8 py-4 rounded-full bg-white text-blue-600 font-medium text-lg hover:shadow-lg hover:shadow-blue-700/30 transition-all duration-300"
              href={"/register"}
            >
              Get Started For Free
            </Link>
          </div>
        </div>
      </div>
      
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Taskify</h3>
            <p className="mb-6">The smart way to manage your tasks</p>
            <div className="flex items-center justify-center gap-6 mb-8">
              {["Terms", "Privacy", "Support", "FAQ"].map((item, i) => (
                <a key={i} href="#" className="hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </div>
            <p className="text-sm">© {new Date().getFullYear()} Taskify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
