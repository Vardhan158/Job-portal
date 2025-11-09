import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase";
import API from "../api";
import { MapPin, GraduationCap, Briefcase, Code, UserCircle } from "lucide-react";

export default function Profile() {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    headline: "",
    location: "",
    about: "",
    education: "",
    experience: "",
    skills: "",
  });
  const [isEditing, setIsEditing] = useState(true);
  const [applications, setApplications] = useState([]);
  const [showCompanies, setShowCompanies] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await firebaseUser.reload();
        setUser({
          name: firebaseUser.displayName || "Guest User",
          email: firebaseUser.email,
          photo:
            firebaseUser.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        });
      }
    });

    const savedProfile = JSON.parse(localStorage.getItem("profileData"));
    if (savedProfile) {
      setProfile(savedProfile);
      setIsEditing(false);
    }
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await API.get("/api/applications/my");
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser({
        name: user.displayName,
        email: user.email,
        photo:
          user.photoURL ||
          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      });
      alert("✅ Signed in successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Sign-in failed. Try again.");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("profileData", JSON.stringify(profile));
    setIsEditing(false);
    alert("✅ Profile saved successfully!");
  };

  const toggleCompanies = () => setShowCompanies(!showCompanies);
  const handleEdit = () => setIsEditing(true);

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    localStorage.removeItem("googleUser");
    alert("👋 Logged out successfully!");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-6 overflow-hidden z-0">
      {/* ✨ Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-300 via-purple-200 to-transparent blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-6xl mx-auto bg-white/70 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl overflow-hidden"
      >
        {/* 🌈 Banner */}
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
          <img
            src={user?.photo}
            alt="Profile"
            className="absolute left-6 -bottom-12 w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>

        {/* 👤 Header Info */}
        <div className="px-8 pt-16 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {user?.name || "Guest User"}{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-indigo-500 text-xl"
              >
                👋
              </motion.span>
            </h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>

          {!user ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={handleGoogleLogin}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-5 py-2.5 rounded-xl font-medium shadow hover:shadow-lg transition-all"
            >
              Sign in with Google
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={handleLogout}
              className="bg-gray-200 text-gray-800 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-300 transition"
            >
              Logout
            </motion.button>
          )}
        </div>

        <hr className="border-gray-200" />

        {/* 📝 Profile Section */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {isEditing ? (
            <>
              <FormField label="Headline" value={profile.headline} onChange={(v) => setProfile({ ...profile, headline: v })} />
              <FormField label="Location" value={profile.location} onChange={(v) => setProfile({ ...profile, location: v })} icon={<MapPin className="w-4 h-4" />} />
              <FormField label="About" textarea value={profile.about} onChange={(v) => setProfile({ ...profile, about: v })} />
              <FormField label="Education" value={profile.education} onChange={(v) => setProfile({ ...profile, education: v })} icon={<GraduationCap className="w-4 h-4" />} />
              <FormField label="Experience" textarea value={profile.experience} onChange={(v) => setProfile({ ...profile, experience: v })} icon={<Briefcase className="w-4 h-4" />} />
              <FormField label="Skills" value={profile.skills} onChange={(v) => setProfile({ ...profile, skills: v })} icon={<Code className="w-4 h-4" />} />

              <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-4">
                <motion.button whileHover={{ scale: 1.03 }} type="submit" onClick={handleSave} className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow hover:shadow-lg">
                  Save Profile
                </motion.button>
                <motion.button whileHover={{ scale: 1.03 }} onClick={toggleCompanies} className="flex-1 bg-indigo-100 text-indigo-700 py-3 rounded-xl font-semibold hover:bg-indigo-200">
                  {showCompanies ? "Hide Applied Jobs" : "View Applied Jobs"}
                </motion.button>
              </div>
            </>
          ) : (
            <>
              <InfoCard title="Headline" content={profile.headline} icon={<UserCircle />} />
              <InfoCard title="Location" content={profile.location} icon={<MapPin />} />
              <InfoCard title="About" content={profile.about} icon={<UserCircle />} />
              <InfoCard title="Education" content={profile.education} icon={<GraduationCap />} />
              <InfoCard title="Experience" content={profile.experience} icon={<Briefcase />} />
              <InfoCard title="Skills" content={profile.skills} icon={<Code />} />

              <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-4">
                <motion.button whileHover={{ scale: 1.03 }} onClick={handleEdit} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300">
                  Edit Profile
                </motion.button>
                <motion.button whileHover={{ scale: 1.03 }} onClick={toggleCompanies} className="flex-1 bg-indigo-100 text-indigo-700 py-3 rounded-xl font-semibold hover:bg-indigo-200">
                  {showCompanies ? "Hide Applied Jobs" : "View Applied Jobs"}
                </motion.button>
              </div>
            </>
          )}
        </div>

        {/* 🏢 Applied Companies Section */}
        {showCompanies && (
          <div className="p-8 border-t border-gray-200 bg-white/60 backdrop-blur-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Applied Companies ({applications.length})
            </h3>

            {applications.length === 0 ? (
              <p className="text-gray-500">No applications yet.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications.map((app, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white/80 border border-gray-100 rounded-2xl p-5 shadow-md hover:shadow-xl transition"
                  >
                    <h4 className="text-lg font-semibold text-gray-800">
                      {app.job?.company}
                    </h4>
                    <p className="text-indigo-600 text-sm">{app.job?.title}</p>
                    <p className="text-gray-500 text-xs mt-2">
                      Applied on: {new Date(app.createdAt).toLocaleDateString()}
                    </p>

                    <p className="text-sm mt-3">
                      <strong>Degree %:</strong> {app.degreePercentage}
                    </p>
                    <p className="text-sm mt-1">
                      <strong>Language:</strong>{" "}
                      {Object.entries(app.programming)
                        .filter(([_, val]) => val === 5)
                        .map(([lang]) => lang)
                        .join(", ") || "N/A"}
                    </p>

                    <span
                      className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
                        app.status === "Shortlisted"
                          ? "bg-green-100 text-green-700"
                          : app.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {app.status || "Pending"}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ✅ Reusable Input Field */
function FormField({ label, value, onChange, placeholder, textarea, icon }) {
  return (
    <div className="space-y-1">
      <label className="block text-gray-700 font-medium">{label}</label>
      {textarea ? (
        <textarea
          rows="3"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition bg-white/70 backdrop-blur-sm"
        ></textarea>
      ) : (
        <div className="relative">
          {icon && <span className="absolute left-3 top-2.5 text-indigo-500">{icon}</span>}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition bg-white/70 backdrop-blur-sm"
          />
        </div>
      )}
    </div>
  );
}

/* ✅ Reusable Info Card */
function InfoCard({ title, content, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-center gap-2 mb-2 text-indigo-600 font-medium">
        {icon}
        <h4>{title}</h4>
      </div>
      <p className="text-gray-700 text-sm">
        {content || "No information added yet."}
      </p>
    </motion.div>
  );
}
