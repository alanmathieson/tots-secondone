'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Post {
  id: number;
  subject: string;
  body: string;
  timestamp: Date;
  isNew: boolean;
}

export default function BBSNoticeboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [visitorCount] = useState(Math.floor(Math.random() * 9999) + 1000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject.trim() && body.trim()) {
      const newPost: Post = {
        id: Date.now(),
        subject: subject.trim(),
        body: body.trim(),
        timestamp: new Date(),
        isNew: true,
      };
      setPosts([newPost, ...posts]);
      setSubject('');
      setBody('');

      // Remove [NEW!] tag after 5 seconds
      setTimeout(() => {
        setPosts(prev => prev.map(p => p.id === newPost.id ? { ...p, isNew: false } : p));
      }, 5000);
    }
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="min-h-screen bg-black p-4 font-mono">
      <style jsx global>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes scroll-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        .blink {
          animation: blink 1s infinite;
        }

        .marquee {
          animation: scroll-left 20s linear infinite;
          white-space: nowrap;
        }

        .retro-shadow {
          box-shadow: 5px 5px 0px #ff00ff, -5px -5px 0px #00ffff;
        }

        .retro-border {
          border: 4px solid;
          border-color: #00ffff #ff00ff #ff00ff #00ffff;
        }

        .ascii-border {
          border: 3px solid #00ff00;
          box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.3);
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 p-4 bg-blue-900 retro-border">
          <div className="overflow-hidden mb-2">
            <h1 className="marquee text-4xl font-bold text-yellow-300">
              ★☆★ WELCOME TO THE CYBER NOTICEBOARD BBS ★☆★ ESTABLISHED 1995 ★☆★ TOTALLY RAD ★☆★
            </h1>
          </div>

          <div className="text-center space-y-2">
            <pre className="text-cyan-400 text-sm">
╔═══════════════════════════════════════════════════════════════════════════╗
║              ░▒▓█ RETRO COMMUNITY BULLETIN BOARD SYSTEM █▓▒░              ║
╚═══════════════════════════════════════════════════════════════════════════╝
            </pre>

            <div className="flex justify-between text-xs px-4">
              <span className="text-lime-400">
                🌐 VISITOR #{visitorCount.toString().padStart(6, '0')}
              </span>
              <span className="text-magenta-400 blink">
                ⚡ ONLINE NOW ⚡
              </span>
              <span className="text-cyan-400">
                📅 LAST UPDATED: {new Date().toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Under Construction Banner */}
        <div className="mb-4 p-2 bg-yellow-400 text-black text-center font-bold border-4 border-black">
          <span className="blink">🚧</span> UNDER CONSTRUCTION
          <span className="blink">🚧</span> BEST VIEWED IN NETSCAPE NAVIGATOR
          <span className="blink">🚧</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Post Creation Form */}
          <div>
            <Card className="bg-gradient-to-br from-purple-900 to-blue-900 text-white retro-shadow">
              <CardHeader className="border-b-4 border-cyan-400">
                <CardTitle className="text-2xl text-yellow-300">
                  <span className="blink">►</span> POST NEW MESSAGE <span className="blink">◄</span>
                </CardTitle>
                <div className="text-lime-400 text-xs mt-2">
                  ═══════════════════════════════════════
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-cyan-400 mb-2 text-sm">
                      ▸▸▸ SUBJECT LINE:
                    </label>
                    <Input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Enter your message subject..."
                      className="bg-black text-lime-400 border-2 border-cyan-400 placeholder:text-gray-600 font-mono"
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label className="block text-cyan-400 mb-2 text-sm">
                      ▸▸▸ MESSAGE BODY:
                    </label>
                    <Textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="Type your message here..."
                      className="bg-black text-lime-400 border-2 border-cyan-400 placeholder:text-gray-600 font-mono min-h-32"
                      maxLength={500}
                    />
                  </div>

                  <div className="text-magenta-300 text-xs">
                    =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-lime-400 text-black hover:bg-lime-300 font-bold text-lg border-4 border-lime-600 shadow-lg hover:shadow-xl transition-all"
                  >
                    ✉ TRANSMIT MESSAGE ✉
                  </Button>
                </form>

                <div className="text-center text-xs text-gray-400 mt-4">
                  <span className="blink">⚠</span> NO SPAM • BE EXCELLENT TO EACH OTHER <span className="blink">⚠</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Posts List */}
          <div>
            <Card className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white retro-shadow">
              <CardHeader className="border-b-4 border-magenta-400">
                <CardTitle className="text-2xl text-yellow-300">
                  <span className="blink">♦</span> MESSAGE BOARD <span className="blink">♦</span>
                </CardTitle>
                <div className="text-lime-400 text-xs mt-2">
                  ═══════════════════════════════════════
                </div>
                <div className="text-cyan-300 text-sm mt-2">
                  📊 TOTAL MESSAGES: {posts.length}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {posts.length === 0 ? (
                  <div className="text-center py-12">
                    <pre className="text-gray-500 text-xs mb-4">
╔════════════════════════════╗
║   NO MESSAGES YET...       ║
║   BE THE FIRST TO POST!    ║
╚════════════════════════════╝
                    </pre>
                    <p className="text-gray-400 text-sm">
                      The board is empty. Post something rad!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {posts.map((post, index) => (
                      <div
                        key={post.id}
                        className="bg-black p-4 ascii-border rounded-lg relative hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                      >
                        {post.isNew && (
                          <span className="absolute -top-2 -right-2 bg-red-600 text-yellow-300 px-2 py-1 text-xs font-bold border-2 border-yellow-300 blink">
                            [NEW!]
                          </span>
                        )}

                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="text-cyan-400 text-xs mb-1">
                              ▼▼▼ MESSAGE #{posts.length - index} ▼▼▼
                            </div>
                            <h3 className="text-magenta-400 font-bold text-lg break-words">
                              {post.subject}
                            </h3>
                          </div>

                          <Button
                            onClick={() => handleDelete(post.id)}
                            variant="destructive"
                            size="sm"
                            className="ml-2 bg-red-600 hover:bg-red-700 border-2 border-red-800"
                            title="Delete post"
                          >
                            🗑
                          </Button>
                        </div>

                        <div className="text-lime-400 text-xs mb-2">
                          ─────────────────────────────────
                        </div>

                        <p className="text-lime-300 whitespace-pre-wrap break-words text-sm mb-3">
                          {post.body}
                        </p>

                        <div className="text-gray-500 text-xs flex items-center justify-between">
                          <span>
                            ⏰ {post.timestamp.toLocaleString()}
                          </span>
                          <span className="text-yellow-400">
                            ★★★
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 retro-border text-center">
          <div className="text-cyan-400 text-xs mb-2">
            ══════════════════════════════════════════════════════════════════
          </div>
          <p className="text-magenta-400 text-sm mb-2">
            <span className="blink">◄►</span> Powered by Web 1.0 Technology <span className="blink">◄►</span>
          </p>
          <p className="text-lime-400 text-xs">
            ♫ Now Playing: Dial-up Modem Sounds ♫
          </p>
          <div className="text-yellow-300 text-xs mt-2">
            <span className="blink">⚡</span> BEST EXPERIENCED AT 800x600 RESOLUTION <span className="blink">⚡</span>
          </div>
          <div className="text-gray-500 text-xs mt-3">
            © 1995-2025 • All Wrongs Reserved • Made with ❤️ and nostalgia
          </div>
        </div>
      </div>
    </div>
  );
}
