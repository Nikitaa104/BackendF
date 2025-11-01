import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { OnboardingModal } from "@/components/OnboardingModal";
import { Dashboard } from "./Dashboard";
import { BadgesPage } from "./BadgesPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, Calendar, Clock, Menu, X, LogOut } from "lucide-react";

interface UserData {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  college: string;
  year: string;
  branch: string;
  interests: string[];
}

interface Event {
  id: string;
  title: string;
  image: string;
  tags: string[];
  date: string;
  location: string;
  isBookmarked?: boolean;
  isRsvped?: boolean;
  isPast?: boolean;
}

interface UserIndexProps {
  onLogout?: () => void;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Tech Innovators Hackathon 2024",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
    tags: ["Technical", "Hackathon", "AI/ML"],
    date: "Nov 15-17, 2024",
    location: "IIT Delhi Campus",
  },
  {
    id: "2",
    title: "Spring Music Festival",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400",
    tags: ["Music", "Cultural", "Entertainment"],
    date: "Nov 20, 2024",
    location: "Open Air Theater",
  },
  {
    id: "3",
    title: "Creative Arts Workshop",
    image: "https://images.unsplash.com/photo-1578926078328-123456789012?w=400",
    tags: ["Art", "Workshop", "Sketching"],
    date: "Nov 22, 2024",
    location: "Art Gallery, Main Campus",
  },
  {
    id: "4",
    title: "Inter-College Sports Championship",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400",
    tags: ["Sports", "Competition", "Athletics"],
    date: "Nov 25-27, 2024",
    location: "Sports Complex",
  },
  {
    id: "5",
    title: "AI & Machine Learning Symposium",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
    tags: ["Technical", "AI/ML", "Research"],
    date: "Dec 1, 2024",
    location: "Auditorium Block A",
  },
  {
    id: "6",
    title: "Photography Masterclass",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
    tags: ["Photography", "Workshop", "Art"],
    date: "Dec 5, 2024",
    location: "Media Center",
  },
];

const Index = ({ onLogout }: UserIndexProps) => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("home");
  const [points, setPoints] = useState(250);
  const [events, setEvents] = useState(mockEvents);
  const [reminders, setReminders] = useState<string[]>([]);

  const handleOnboardingComplete = (data: UserData) => {
    setUserData(data);
    setShowOnboarding(false);
    toast.success(`Welcome aboard, ${data.fullName.split(" ")[0]}! 🎉`);
  };

  const handleRsvp = (eventId: string) => {
    setEvents(events.map(e =>
      e.id === eventId ? { ...e, isRsvped: !e.isRsvped } : e
    ));
    
    const event = events.find(e => e.id === eventId);
    if (event && !event.isRsvped) {
      setPoints(prev => prev + 50);
      toast.success("RSVP confirmed! +50 points 🎉");
    }
  };

  const handleBookmark = (eventId: string) => {
    setEvents(events.map(e =>
      e.id === eventId ? { ...e, isBookmarked: !e.isBookmarked } : e
    ));
    
    const event = events.find(e => e.id === eventId);
    toast.success(event?.isBookmarked ? "Removed from bookmarks" : "Added to bookmarks!");
  };

  const handleToggleReminder = (eventId: string) => {
    setReminders(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
    
    const hasReminder = reminders.includes(eventId);
    toast.success(hasReminder ? "Reminder removed" : "Reminder set! 🔔");
  };

  if (showOnboarding) {
    return <OnboardingModal open={showOnboarding} onComplete={handleOnboardingComplete} />;
  }

  const firstName = userData?.fullName.split(" ")[0] || "Student";
  const rsvpedEvents = events.filter(e => e.isRsvped);
  const bookmarkedEvents = events.filter(e => e.isBookmarked);
  const aiRecommendedEvents = events.slice(0, 4);

  const stats = {
    upcomingRsvps: rsvpedEvents.filter(e => !e.isPast).length,
    savedEvents: bookmarkedEvents.length,
    badgesEarned: 2,
    aiRecommendations: aiRecommendedEvents.length,
  };

  const navItems = [
    { label: "Home", view: "home" },
    { label: "For You", view: "foryou" },
    { label: "My RSVPs", view: "rsvps" },
    { label: "Bookmarks", view: "bookmarks" },
    { label: "Badges", view: "badges" },
    { label: "Settings", view: "settings" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-muted rounded-lg">
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-2xl font-bold">Campus Unite</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{firstName}</p>
              <p className="text-xs text-muted-foreground">{points} points</p>
            </div>
            <button
              onClick={onLogout}
              className="p-2 hover:bg-destructive/20 text-destructive rounded-lg"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              className="w-64 bg-card border-r border-border p-6"
            >
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.view}
                    onClick={() => setActivePage(item.view)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      activePage === item.view
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <AnimatePresence mode="wait">
            {activePage === "home" && <Dashboard userName={firstName} stats={stats} />}

            {activePage === "foryou" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h1 className="text-3xl font-bold">For You ✨</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {aiRecommendedEvents.map(event => (
                    <EventCardPreview key={event.id} event={event} onRsvp={handleRsvp} onBookmark={handleBookmark} />
                  ))}
                </div>
              </motion.div>
            )}

            {activePage === "rsvps" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h1 className="text-3xl font-bold">My RSVPs 📅</h1>
                <Tabs defaultValue="upcoming">
                  <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming" className="space-y-4 mt-6">
                    {rsvpedEvents.filter(e => !e.isPast).length === 0 ? (
                      <Card className="p-12 text-center">
                        <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">No upcoming RSVPs yet</p>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {rsvpedEvents.filter(e => !e.isPast).map(event => (
                          <Card key={event.id} className="p-6">
                            <div className="flex gap-4">
                              <img src={event.image} alt={event.title} className="w-32 h-32 rounded-xl object-cover" />
                              <div className="flex-1">
                                <h3 className="font-bold text-lg">{event.title}</h3>
                                <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {event.date}
                                  </span>
                                  <span>{event.location}</span>
                                </div>
                                <Button
                                  variant={reminders.includes(event.id) ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handleToggleReminder(event.id)}
                                  className="mt-3"
                                >
                                  {reminders.includes(event.id) ? (
                                    <>
                                      <Bell className="w-4 h-4 mr-2" />
                                      Reminder On
                                    </>
                                  ) : (
                                    <>
                                      <BellOff className="w-4 h-4 mr-2" />
                                      Set Reminder
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="past" className="mt-6">
                    <Card className="p-12 text-center">
                      <p className="text-muted-foreground">No past events yet</p>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}

            {activePage === "bookmarks" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h1 className="text-3xl font-bold">Bookmarks 🔖</h1>
                {bookmarkedEvents.length === 0 ? (
                  <Card className="p-12 text-center">
                    <p className="text-muted-foreground">No bookmarked events yet</p>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bookmarkedEvents.map(event => (
                      <EventCardPreview key={event.id} event={event} onRsvp={handleRsvp} onBookmark={handleBookmark} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activePage === "badges" && <BadgesPage />}

            {activePage === "settings" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h1 className="text-3xl font-bold">Settings ⚙️</h1>
                <Card className="p-8">
                  <h3 className="text-xl font-bold mb-4">Profile Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{userData?.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{userData?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">College:</span>
                      <span className="font-medium">{userData?.college}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

// Simple Event Card Component
function EventCardPreview({ event, onRsvp, onBookmark }: { event: Event; onRsvp: (id: string) => void; onBookmark: (id: string) => void }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h4 className="font-bold text-sm mb-2">{event.title}</h4>
        <p className="text-xs text-muted-foreground mb-3">{event.date}</p>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1" onClick={() => onRsvp(event.id)}>
            RSVP
          </Button>
          <Button size="sm" variant="outline" onClick={() => onBookmark(event.id)}>
            {event.isBookmarked ? "💙" : "🤍"}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default Index;