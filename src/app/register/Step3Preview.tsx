// Step3.tsx
interface Step3Props {
  formData: any;
}

const Step3 = ({ formData }: Step3Props) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Preview</h3>
      <div className="mb-4">
        <p className="font-medium">Username: {formData.username}</p>
        <p className="font-medium">Email: {formData.email}</p>
        <p className="font-medium">Full Name: {formData.first_name} {formData.last_name}</p>
        {/* Add more preview fields here */}
      </div>
    </div>
  );
};

export default Step3;
