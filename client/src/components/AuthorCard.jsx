import { 
  FaGithub, 
  FaLinkedin,
  FaInstagram, 
  FaGlobe 
} from "react-icons/fa";

const AuthorCard = () => {
  return (
    <div 
      className="shadow rounded-xl p-5 text-center"
      style={{ backgroundColor: "var(--bg-accent)" }}
    >
      {/* Profile Image */}
      <img
        src="/images/profile.jpg"
        alt="Author"
        className="w-128 h-128 mx-auto rounded-2xl object-cover mb-3 shadow"
      />

      {/* Name */}
      <h2 className="text-xl font-semibold">Rounak</h2>

      {/* Mini Bio */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        AI Enthusiast • Blogger • Developer
      </p>

      {/* Social Icons */}
      <div className="flex items-center justify-center gap-4 mt-4 text-gray-600 dark:text-gray-300">

        {/* GitHub */}
        <a 
          href="https://github.com/rounak-codes" 
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-500"
        >
          <FaGithub size={20} />
        </a>

        {/* LinkedIn */}
        <a 
          href="https://www.linkedin.com/in/rounakbag24/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400"
        >
          <FaLinkedin size={20} />
        </a>

        {/* Portfolio (Globe Icon) */}
        <a 
          href="https://www.rounakkrbag.me"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400"
        >
          <FaGlobe size={20} />
        </a>

      </div>
    </div>
  );
};

export default AuthorCard;
