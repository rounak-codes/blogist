import { FaGithub, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const AuthorCard = () => {
  return (
    <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-5 text-center">
      {/* Profile Image */}
      <img
        src="/profile.jpg"  // Place your image in public/profile.jpg
        alt="Author"
        className="w-24 h-24 mx-auto rounded-full object-cover mb-3 shadow"
      />

      {/* Name */}
      <h2 className="text-xl font-semibold">Rounak Bag</h2>

      {/* Mini Bio */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        Genshin Impact Enthusiast • Blogger • Developer
      </p>

      {/* Social Icons */}
      <div className="flex items-center justify-center gap-4 mt-4 text-gray-600 dark:text-gray-300">
        <a href="#" className="hover:text-gray-500"><FaGithub size={20} /></a>
        <a href="#" className="hover:text-blue-400"><FaTwitter size={20} /></a>
        <a href="#" className="hover:text-pink-500"><FaInstagram size={20} /></a>
        <a href="#" className="hover:text-red-500"><FaYoutube size={20} /></a>
      </div>
    </div>
  );
};

export default AuthorCard;
