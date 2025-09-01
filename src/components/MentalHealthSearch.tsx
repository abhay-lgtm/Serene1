import { useState } from 'react';
import { Search, MapPin, Phone, Clock, Star, Heart, Filter, X, ChevronRight, MessageCircle, Shield, Users } from 'lucide-react';

const MentalHealthSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    rating: '',
    availability: ''
  });

  const mentalHealthCenters = [
    {
      id: 1,
      name: "AVM Hospital",
      address: "Avm hospital, Pala-Thodupuzha Rd, Karimkunnam, Thodupuzha, Kerala 685586",
      phone: "+91 9779777242",
      specialties: ["Depression", "Anxiety", "PTSD", "Couples Therapy"],
      rating: 4.8,
      hours: "Mon-Fri: 8AM-8PM, Sat: 9AM-5PM",
      type: "Full Service Center",
      description: "Comprehensive mental health services with experienced therapists specializing in various therapeutic approaches.",
      isAvailable24x7: false,
      hasOnlineConsultation: true,
      acceptsInsurance: true
    },
    {
      id: 2,
      name: "Psy Phoenix Clinical Psychology Centre",
      address: "Thiruvanchoor, Neerikkad, Kottayam, Kerala 686564",
      phone: "+91 9562672801",
      specialties: ["Addiction Recovery", "Substance Abuse", "Group Therapy", "Family Counseling"],
      rating: 4.9,
      hours: "24/7 Crisis Support, Regular hours: 7AM-9PM",
      type: "Recovery Center",
      description: "Specialized in addiction recovery and substance abuse treatment with 24/7 crisis support available.",
      isAvailable24x7: true,
      hasOnlineConsultation: true,
      acceptsInsurance: true
    },
    {
      id: 3,
      name: "COUNSELING FOR CHILD AND ADULT MENTAL CARE",
      address: "Thodupuzha Rd, Pala, Kerala 686595",
      phone: "+91 9745084707",
      specialties: ["Child Psychology", "ADHD", "Autism Spectrum", "Family Therapy"],
      rating: 4.7,
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
      type: "Child Specialist",
      description: "Dedicated to providing mental health services for children and adolescents with specialized pediatric approaches.",
      isAvailable24x7: false,
      hasOnlineConsultation: true,
      acceptsInsurance: true
    },
    {
      id: 4,
      name: "Healthy Minds",
      address: "Moonumackal Blds.Door No. 03, opp. Alphonsa college, Pala, Kerala 686574",
      phone: "+91 8075583431",
      specialties: ["Meditation Therapy", "Stress Management", "Mindfulness", "Holistic Healing"],
      rating: 4.6,
      hours: "Tue-Sun: 8AM-7PM, Closed Mondays",
      type: "Holistic Center",
      description: "Focuses on holistic and alternative approaches to mental wellness including meditation and mindfulness practices.",
      isAvailable24x7: false,
      hasOnlineConsultation: true,
      acceptsInsurance: false
    },
    {
      id: 5,
      name: "MINDMARIS",
      address: "Navodaya jn Saradhy Towers, 6/2095, Kakkanad, Kochi, Kerala 682030",
      phone: "+91 8089090567",
      specialties: ["Crisis Intervention", "Suicide Prevention", "Emergency Counseling", "24/7 Hotline"],
      rating: 5.0,
      hours: "24/7 Emergency Services",
      type: "Crisis Center",
      description: "Immediate crisis intervention and emergency mental health services available around the clock.",
      isAvailable24x7: true,
      hasOnlineConsultation: true,
      acceptsInsurance: true
    },
    {
      id: 6,
      name: "Mibo | The Mind Expert",
      address: "13/1818, Kannanthodathu Rd, near Changampuzha Park Metro Station, Devankulangara, Mamangalam, Edappally, Kochi, Ernakulam, Kerala 682024",
      phone: "+91 9447511479",
      specialties: ["Geriatric Psychology", "Dementia Support", "Grief Counseling", "Senior Depression"],
      rating: 4.7,
      hours: "Mon-Fri: 9AM-5PM",
      type: "Senior Specialist",
      description: "Specialized mental health services for older adults addressing age-specific psychological needs.",
      isAvailable24x7: false,
      hasOnlineConsultation: true,
      acceptsInsurance: true
    },
    {
      id: 7,
      name: "De Elite MindCare",
      address: "Anjumana Rd, Palarivattom - Edappally Rd, next to Flamin' Hot Chicken, Palarivattom, Kochi, Kerala 682024",
      phone: "+91 7736123337",
      specialties: ["Bipolar Disorder", "Schizophrenia", "Personality Disorders", "Psychiatric Care"],
      rating: 4.7,
      hours: "Mon-Sat: 7AM-8PM",
      type: "Psychiatric Center",
      description: "Advanced psychiatric care for complex mental health conditions with medication management and therapy.",
      isAvailable24x7: false,
      hasOnlineConsultation: true,
      acceptsInsurance: true
    },
    {
      id: 8,
      name: "Unarv Mind & Behavior Centre",
      address: "KP Vallon Rd, Nethaji Nagar, Kadavanthra, Kochi, Kerala 682020",
      phone: "+91 9288077723",
      specialties: ["Group Therapy", "Support Groups", "Community Outreach", "Peer Counseling"],
      rating: 4.4,
      hours: "Mon-Thu: 10AM-9PM, Fri-Sat: 10AM-6PM",
      type: "Community Center",
      description: "Community-focused mental health services with emphasis on group support and peer counseling programs.",
      isAvailable24x7: false,
      hasOnlineConsultation: true,
      acceptsInsurance: false
    },
    {
      id: 9,
      name: "Wellness Clinic",
      address: "Ullas Nagar Colony Road, Pottammal Jct, Calicut, Kerala 673016",
      phone: "+91 9567416444",
      specialties: ["Crisis Intervention", "Suicide Prevention"],
      rating: 4.5,
      hours: "Mon-Fri: 9AM-5PM",
      type: "Crisis Center",
      description: "Immediate crisis intervention and emergency mental health services available around the clock.",
      isAvailable24x7: false,
      hasOnlineConsultation: true,
      acceptsInsurance: false
    },
    {
      id: 10,
      name: "Mind World Counselling Centre",
      address: "Kovoor - Vellimadukunn Rd, Vellimadukunnu, Calicut, Kerala 673008",
      phone: "+91 9946303096",
      specialties: ["Depression", "Anxiety", "PTSD", "Couples Therapy"],
      rating: 4.8,
      hours: "Mon-Fri: 8AM-8PM, Sat: 9AM-5PM",
      type: "Full Service Center",
      description: "Comprehensive mental health services with experienced therapists specializing in various therapeutic approaches.",
      isAvailable24x7: false,
      hasOnlineConsultation: true,
      acceptsInsurance: true
    },
    {
      id: 11,
      name: "Roots & Routes Counselling and Psychotherapy Centre",
      address: "First Floor, Ameen Complex, East Kottaparamba, Muthalakulam,Calicut, Kerala 673002",
      phone: "+91 9746010510",
      specialties: ["ADHD", "Autism Spectrum", "Family Therapy"],
      rating: 4.6,
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
      type: "Community-centre",
      description: "Dedicated to providing mental health services for children and adolescents with specialized pediatric approaches.",
      isAvailable24x7: false,
      hasOnlineConsultation: true,
      acceptsInsurance: false
    },
    {
      id: 12,
      name: "Mind Aid | Counselling Centre & Psychometry Lab",
      address: "OfficeNo-203, Muley Arcade 1537, Near Heera Photo Studio, Tilak Rd, above Agraj Foods, Pune, Maharashtra 411030",
      phone: "+91 8390028383",
      specialties: ["Geriatric Psychology", "Dementia Support", "Grief Counseling", "Senior Depression"],
      rating: 4.7,
      hours: "Mon-Fri: 9AM-5PM",
      type: "Senior Specialist",
      description: "Specialized mental health services for older adults addressing age-specific psychological needs.",
      isAvailable24x7: false,
      hasOnlineConsultation: true,
      acceptsInsurance: true
    },
    {
      id: 13,
      name: "Anushka's Counseling and Psychotherapy Centre",
      address: "404, Padmavati Ashray, Aath Rasta Chowk, opp. Paathshaala Academy, U-2, Laxminagar, Nagpur, Maharashtra 440022",
      phone: "+91 9922238509",
      specialties: ["Stress Management", "Mindfulness", "Cognitive Behavioral Therapy", "Anger Management"],
      rating: 4.8,
      hours: "Mon-Sat: 9AM-7PM",
      type: "Therapy Center",
      description: "Offering evidence-based therapies such as CBT and mindfulness practices for stress reduction and emotional regulation.",
      isAvailable24x7: false,
      hasOnlineConsultation: true,
      acceptsInsurance: true
    },
    {
      id: 14,
      name: "ISHNAA Psychological Counselling Centre",
      address: "OFFICE NO 406, IVORY TOWERS, ABOVE TANISHQ GOLD SHOWROOM SATARA ROAD, BIBWEWADI 411037, Pune, Maharashtra 411043",
      phone: "+91 9067176990",
      specialties: ["Depression", "Anxiety", "Phobia Treatment", "Sleep Disorders"],
      rating: 5.0,
      hours: "Mon-Fri: 10AM-6PM, Sat: 11AM-3PM",
      type: "Clinical Psychology",
      description: "Specialized psychological services focused on mood disorders, anxiety conditions, and sleep-related mental health concerns.",
      isAvailable24x7: false,
      hasOnlineConsultation: true,
      acceptsInsurance: true
    },
    {
      id: 15,
      name: "Milestones Counselling and Training Centre",
      address: "12, Lavendar Gardens 3rd cross, Zoo Road, Kuruvampatti, Salem, Tamil Nadu 636008",
      phone: "+91 9003310280",
      specialties: ["Suicide Prevention", "Crisis Intervention", "Emergency Counseling"],
      rating: 5.0,
      hours: "24/7 Emergency Services",
      type: "Crisis Center",
      description: "Round-the-clock crisis helpline and emergency mental health services for individuals in acute distress.",
      isAvailable24x7: true,
      hasOnlineConsultation: true,
      acceptsInsurance: true
    },
    {
      id: 16,
      name: "KAVITHALAYAA COUNSELING CENTRE",
      address: "18, 1st St, Samdharya Nagar, Ambattur, Chennai, Tamil Nadu 600053",
      phone: "+91 9962346966",
      specialties: ["Child Psychology", "Behavioral Therapy", "Family Counseling", "School Stress Management"],
      rating: 4.8,
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-2PM",
      type: "Child & Family Center",
      description: "Focused on children and families, offering behavioral therapy, counseling, and parental guidance for holistic development.",
      isAvailable24x7: false,
      hasOnlineConsultation: true,
      acceptsInsurance: true
    },
    {
      id: 17,
      name: "Yellow Pond Counselling and Wellness Centre",
      address: "695, 9th North, Manikkavasagar St, Anna Nagar, Sathamangalam, Madurai, Tamil Nadu 625020",
      phone: "+91 9750406463",
      specialties: ["Depression", "Workplace Stress", "Burnout Recovery", "Life Coaching"],
      rating: 4.7,
      hours: "Mon-Sat: 9AM-8PM",
      type: "Wellness Clinic",
      description: "Providing integrated mental health care with a focus on workplace stress management, burnout recovery, and life coaching.",
      isAvailable24x7: false,
      hasOnlineConsultation: true,
      acceptsInsurance: true
    }

  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim() && !Object.values(selectedFilters).some(filter => filter)) return;

    let filtered = mentalHealthCenters.filter(center => {
      const matchesSearch = !searchQuery.trim() || 
        center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        center.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = !selectedFilters.type || center.type === selectedFilters.type;
      const matchesRating = !selectedFilters.rating || center.rating >= parseFloat(selectedFilters.rating);
      const matchesAvailability = !selectedFilters.availability || 
        (selectedFilters.availability === '24x7' && center.isAvailable24x7) ||
        (selectedFilters.availability === 'online' && center.hasOnlineConsultation);

      return matchesSearch && matchesType && matchesRating && matchesAvailability;
    });

    setSearchResults(filtered);
    setHasSearched(true);
  };

  const clearFilters = () => {
    setSelectedFilters({ type: '', rating: '', availability: '' });
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={`${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'} transition-colors`} 
      />
    ));
  };

  const quickSearchSuggestions = [
    { label: "Depression Support", icon: "💙", category: "Depression" },
    { label: "Anxiety Help", icon: "🌿", category: "Anxiety" },
    { label: "Child Therapy", icon: "🧸", category: "Child Psychology" },
    { label: "Crisis Support", icon: "🆘", category: "Crisis Support" },
    { label: "Addiction Recovery", icon: "🌱", category: "Addiction Recovery" },
    { label: "Couples Therapy", icon: "💕", category: "Couples Therapy" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/30">
      {/* Enhanced Header with Trust Indicators */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-blue-100/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-center space-x-4 mb-3">
            <div className="relative">
              <Heart className="text-blue-600" size={36} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Mental Health Care Centers
              </h1>
              <p className="text-slate-600 text-sm font-medium">Find compassionate, professional support near you</p>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-6 text-xs text-slate-600">
            <div className="flex items-center space-x-1">
              <Shield size={14} className="text-emerald-600" />
              <span>Verified Centers</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle size={14} className="text-blue-600" />
              <span>24/7 Crisis Support</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users size={14} className="text-purple-600" />
              <span>Licensed Professionals</span>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Search Section */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, specialty, or location..."
              className="w-full px-6 py-5 text-lg border-2 border-slate-200 rounded-2xl focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 shadow-lg transition-all duration-300 group-hover:shadow-xl bg-white/80 backdrop-blur-sm"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="p-3 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
              >
                <Filter size={20} />
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Enhanced Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Center Type</label>
                  <select
                    value={selectedFilters.type}
                    onChange={(e) => setSelectedFilters({...selectedFilters, type: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-lg focus:border-blue-400 focus:outline-none bg-white"
                  >
                    <option value="">All Types</option>
                    <option value="Full Service Center">Full Service</option>
                    <option value="Crisis Center">Crisis Support</option>
                    <option value="Child Specialist">Child Specialist</option>
                    <option value="Recovery Center">Recovery Center</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Minimum Rating</label>
                  <select
                    value={selectedFilters.rating}
                    onChange={(e) => setSelectedFilters({...selectedFilters, rating: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-lg focus:border-blue-400 focus:outline-none bg-white"
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Availability</label>
                  <select
                    value={selectedFilters.availability}
                    onChange={(e) => setSelectedFilters({...selectedFilters, availability: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-lg focus:border-blue-400 focus:outline-none bg-white"
                  >
                    <option value="">Any Time</option>
                    <option value="24x7">24/7 Available</option>
                    <option value="online">Online Consultation</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Clear All
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Enhanced Quick Search Suggestions */}
        {!hasSearched && (
          <div className="text-center mb-8">
            <p className="text-slate-600 mb-6 text-lg">Find support for specific needs:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {quickSearchSuggestions.map((suggestion) => (
                <button
                  key={suggestion.category}
                  onClick={() => {
                    setSearchQuery(suggestion.category);
                    const filtered = mentalHealthCenters.filter(center => 
                      center.specialties.some(specialty => 
                        specialty.toLowerCase().includes(suggestion.category.toLowerCase())
                      )
                    );
                    setSearchResults(filtered);
                    setHasSearched(true);
                  }}
                  className="group p-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-left"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{suggestion.icon}</span>
                    <div>
                      <div className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                        {suggestion.label}
                      </div>
                      <div className="text-xs text-slate-500">Find specialists</div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-500 ml-auto mt-2 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Search Results */}
        {hasSearched && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                Found {searchResults.length} center{searchResults.length !== 1 ? 's' : ''}
              </h2>
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <X size={16} />
                <span>Clear Search</span>
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200">
                <div className="text-slate-400 mb-6">
                  <Search size={80} className="mx-auto opacity-50" />
                </div>
                <h3 className="text-2xl font-bold text-slate-600 mb-3">No Results Found</h3>
                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                  We couldn't find any centers matching your criteria. Try adjusting your search terms or filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {searchResults.map((center) => (
                  <div key={center.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-200 hover:border-blue-200">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                            {center.name}
                          </h3>
                          {center.isAvailable24x7 && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                              24/7
                            </span>
                          )}
                          {center.hasOnlineConsultation && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                              Online
                            </span>
                          )}
                        </div>
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 text-sm rounded-full font-medium">
                          {center.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 bg-amber-50 px-3 py-2 rounded-xl">
                        <div className="flex items-center space-x-1">
                          {renderStars(center.rating)}
                        </div>
                        <span className="text-slate-700 font-semibold">{center.rating}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 mb-6 leading-relaxed">{center.description}</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl">
                        <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={18} />
                        <span className="text-slate-700 text-sm leading-relaxed">{center.address}</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                        <Phone className="text-emerald-600 flex-shrink-0" size={18} />
                        <a href={`tel:${center.phone}`} className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                          {center.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 mb-6 p-3 bg-amber-50 rounded-xl">
                      <Clock className="text-amber-600 flex-shrink-0" size={18} />
                      <span className="text-slate-700 font-medium">{center.hours}</span>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-3 flex items-center space-x-2">
                        <span>Specializations</span>
                        <div className="h-px bg-gradient-to-r from-blue-200 to-transparent flex-1"></div>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {center.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="px-3 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 text-sm rounded-xl font-medium hover:shadow-md transition-shadow cursor-default"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Call-to-Action */}
                    <div className="mt-6 pt-6 border-t border-slate-200 flex space-x-3">
                      <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                        Contact Center
                      </button>
                      <button className="px-6 py-3 border-2 border-slate-200 text-slate-600 rounded-xl hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium">
                        Learn More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Enhanced Footer with Crisis Resources */}
      <footer className="bg-sky-200 text-black py-12 mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <Heart className="mx-auto mb-4 text-black" size={40} />
            <h3 className="text-2xl font-bold mb-2">You're Not Alone</h3>
            <p className="text-blac-50 text-lg max-w-2xl mx-auto leading-relaxed">
              Seeking help is a sign of strength. Professional support can make all the difference in your mental health journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="rounded-2xl p-6 bg-sky-200/30 backdrop-blur-sm border border-gray-700">
              <h4 className="font-bold text-lg mb-3 text-black">🆘 Crisis Support</h4>
              <p className="text-black-50 mb-3">If you're in immediate danger or having thoughts of self-harm:</p>
              <a href="tel:1800-891-4416" className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium">
                <Phone size={16} />
                <span>Call 1800-891-4416</span>
              </a>
            </div>
            
            <div className="rounded-2xl p-6 bg-sky-200/30 backdrop-blur-sm border border-gray-700">
              <h4 className="font-bold text-lg mb-3 text-black">💬 Text Support</h4>
              <p className="text-black-50 mb-3">Text-based crisis counseling available 24/7:</p>
              <div className="text-black font-medium">
                Text "HOME" to 741741
              </div>
            </div>
          </div>
          
          <div className="text-center text-black-100 text-sm">
            <p>Professional, confidential support is available. You deserve care and compassion.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MentalHealthSearch;
