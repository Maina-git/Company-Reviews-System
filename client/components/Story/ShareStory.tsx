import React, { useEffect, useState } from "react";
import { Briefcase, Building, Send, User } from "lucide-react";
import axios from "axios";
import Select from "react-select";
import { Heart } from "lucide-react";
import { handelRequest } from "../utils/apiRequest";
import { FileText } from "lucide-react";
import { BASE_API_URL } from "@/server";
import { LoadingButton } from "../utils/Loadingbutton";

type CompanyType = {
  _id: string;
  name: string;
};

const ShareStory = () => {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<CompanyType[]>([]);

  const [formData, setFormData] = useState({
    vibe: "neutral",
    companyName: "",
    isAnonymous: false,
    name: "",
    userType: "individualCustomer",
    title: "",
    story: "",
  });


  const vibeOptions = [
    { value: "neutral", label: "Neutral" },
    { value: "positive", label: "Positive" },
    { value: "negative", label: "Negative" },
  ];

  const userTypeOptions = [
    { value: "individualCustomer", label: "Individual Customer" },
    { value: "businessCustomer", label: "Business Customer" },
    { value: "bankEmployee", label: "Bank Employee" },
    { value: "formerEmployee", label: "Former Employee" },
    { value: "investor", label: "Investor" },
    { value: "other", label: "Other" },
  ];

  const companyOptions = companies.map((c) => ({
    label: c.name,
    value: c.name,
  }));

  useEffect(() => {
    const fetchCompanies = async () => {
      const companyReq = async () => {
        return axios.get(`${BASE_API_URL}/companies/all`);
      };

      const result = await handelRequest(companyReq, setLoading);

      if (result?.data?.status === "success") {
        setCompanies(result.data.data.companies);
      }
    };

    fetchCompanies();
  }, []);

  /*submit function */

const handleChange = (e:React.ChangeEvent <HTMLInputElement | HTMLTextAreaElement>)=>{
  const {name, value, type} = e.target;
  const checked = (e.target as HTMLInputElement).checked;
  setFormData((prev)=>({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
}
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("FORM DATA:", formData);
  };


  return (
    <div className="min-h-screen mt-10 bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">
          Share your Banking Experience
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              <Heart className="inline w-4 h-4 mr-2" />
              Vibe
            </label>
            <Select
              options={vibeOptions}
              value={vibeOptions.find(
                (v) => v.value === formData.vibe
              )}
              onChange={(selected) =>setFormData({...formData,
                  vibe: selected?.value || "neutral",
                })
              }
              isSearchable={false}/>
          </div>
<div>
  <label className="block font-medium mb-1 text-gray-700">
  <Building className="inline w-4 h-4 mr-2"/>Company</label>
<Select
options={companyOptions}
value={companyOptions.find((opt)=>opt.value === formData.companyName)}
onChange={ (selected) => setFormData({...formData, companyName:selected?.value || ""})}
placeholder="Select Company"
isSearchable/>
</div>


<div className="flex items-center space-x-2">
  <input type="checkbox" name="isAnonymous" checked={formData.isAnonymous}
  onChange={handleChange}/>
   <label className=" text-sm text-gray-700">Post Anonymously</label>
</div>

{
  !formData.isAnonymous && (
    <div>
      <label className="block font-medium mb-1 text-gray-700">
        <User className="inline w-4 h-4 mt-2"/> Your Name
      </label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} 
      placeholder="Enter Your Name"
      className="w-full border px-3 py-2 rounded"/>
    </div>
  )
}

{ /* user type select */}

<div>

 <label className="block font-medium mb-1 text-gray-700">
  <Briefcase className="inline w-4 h-4 mr-2"/>
  User Type
  </label> 

  <Select   name="userType"  options={userTypeOptions}
  value={{
    value:formData.userType,
    label:formData.userType.split(" ").map((word)=>word[0].toUpperCase() + word.slice(1)).join(" "),
  }}
  onChange={(selected)=> setFormData({
    ...formData,
    userType:selected?.value || "individual customer"
  })
}
isSearchable
/>

</div>


<div>
  <label className="block font-medium mb-1 text-gray-700">
    <FileText className="inline w-4 h-4 mr-2"/>
    Story Title
  </label>
  <input type="text" name="title" value={formData.title} onChange={handleChange}
  placeholder="One Line summary of your story" required className=" w-full border px-3 py-2 rounded"/>
</div>

<div>
  <label className="block font-medium mb-1 text-gray-700">
    <FileText className="inline w-4 h-4 mr-2"/>
    Story
  </label>
  <textarea name="story" value={formData.story} onChange={handleChange} 
  placeholder="Describe your experience......" rows={6} required 
  className="w-full border px-3 py-2 rounded resize-y"/>
</div>


<div className="text-right">
  <LoadingButton isLoading={loading} type="submit" 
  className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2
  px-6 rounded disabled:opacity-50">
<span className="inline-flex items-center">
  <Send className="w-full h-4 mr-2"/>
  Share Story
</span>
  </LoadingButton>

</div>



        </form>
      </div>
    </div>
  );
};

export default ShareStory;














