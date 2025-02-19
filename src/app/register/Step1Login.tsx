// Step1.tsx
interface Step1Props {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step1 = ({ formData, handleInputChange }: Step1Props) => {

  return (
    <div className="bg-white p-6 mt-6 rounded-2xl shadow-xl">
      <div className="mb-4">
        <label className="block text-sm font-bold text-primary">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className="mt-2 p-2 w-full border-2 border-gray-200 rounded-md"
          placeholder="Enter your username"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold text-primary">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="mt-2 p-2 w-full border-2 border-gray-200 rounded-md "
          placeholder="Enter your password"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold text-primary">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="mt-2 p-2 w-full border-2 border-gray-200 rounded-md"
          placeholder="Enter your password again to confirm"
        />
      </div>
    </div>
  );
};

export default Step1;
