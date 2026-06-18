import PortalLayout from "@/components/layouts/portal/PortalLayout";
import { useState } from "react";
import { PencilIcon, CheckIcon, XMarkIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

// ─── Types ───────────────────────────────────────────────────────────────────

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  bio: string;
}

interface Experience {
  id: string;
  company: string;
  role: string;
  from: string;
  to: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  from: string;
  to: string;
}

// ─── Initial Data ─────────────────────────────────────────────────────────────

const INITIAL_INFO: PersonalInfo = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  title: "",
  bio: "",
};

const INITIAL_SKILLS: string[] = [];

// Generates a unique id without relying on crypto.randomUUID, which is only
// available in secure contexts (https or localhost). This works over plain
// http and on LAN IP addresses too.
const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

// ─── Small reusable components ────────────────────────────────────────────────

const Field = ({
  label,
  value,
  editing,
  name,
  onChange,
  type = "text",
  textarea = false,
}: {
  label: string;
  value: string;
  editing: boolean;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  textarea?: boolean;
}) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
      {label}
    </label>
    {editing ? (
      textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      )
    ) : (
      <p className="text-gray-900 text-sm py-2">{value || <span className="text-gray-400 italic">Not set</span>}</p>
    )}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<"info" | "experience" | "education" | "skills">("info");

  // Personal Info
  const [info, setInfo] = useState<PersonalInfo>(INITIAL_INFO);
  const [editingInfo, setEditingInfo] = useState(false);
  const [draftInfo, setDraftInfo] = useState<PersonalInfo>(INITIAL_INFO);

  // Experience
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [draftExp, setDraftExp] = useState<Experience | null>(null);

  // Education
  const [educations, setEducations] = useState<Education[]>([]);
  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [draftEdu, setDraftEdu] = useState<Education | null>(null);

  // Skills
  const [skills, setSkills] = useState<string[]>(INITIAL_SKILLS);
  const [newSkill, setNewSkill] = useState("");

  // ── Info handlers ──
  const startEditInfo = () => { setDraftInfo({ ...info }); setEditingInfo(true); };
  const saveInfo = () => { setInfo(draftInfo); setEditingInfo(false); };
  const cancelInfo = () => setEditingInfo(false);
  const onInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setDraftInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ── Experience handlers ──
  const newExp = (): Experience => ({
    id: generateId(),
    company: "", role: "", from: "", to: "", current: false, description: "",
  });

  const addExp = () => {
    const e = newExp();
    setExperiences((prev) => [...prev, e]);
    setDraftExp(e);
    setEditingExpId(e.id);
  };

  const saveExp = () => {
    if (!draftExp) return;
    setExperiences((prev) => prev.map((e) => e.id === draftExp.id ? draftExp : e));
    setEditingExpId(null);
    setDraftExp(null);
  };

  const cancelExp = (id: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id || experiences.find((x) => x.id === id)?.company));
    setEditingExpId(null);
    setDraftExp(null);
  };

  const deleteExp = (id: string) => setExperiences((prev) => prev.filter((e) => e.id !== id));

  const editExp = (exp: Experience) => { setDraftExp({ ...exp }); setEditingExpId(exp.id); };

  // ── Education handlers ──
  const newEdu = (): Education => ({
    id: generateId(),
    institution: "", degree: "", field: "", from: "", to: "",
  });

  const addEdu = () => {
    const e = newEdu();
    setEducations((prev) => [...prev, e]);
    setDraftEdu(e);
    setEditingEduId(e.id);
  };

  const saveEdu = () => {
    if (!draftEdu) return;
    setEducations((prev) => prev.map((e) => e.id === draftEdu.id ? draftEdu : e));
    setEditingEduId(null);
    setDraftEdu(null);
  };

  const deleteEdu = (id: string) => setEducations((prev) => prev.filter((e) => e.id !== id));
  const editEdu = (edu: Education) => { setDraftEdu({ ...edu }); setEditingEduId(edu.id); };

  // ── Skills handlers ──
  const addSkill = () => {
    const s = newSkill.trim();
    if (s && !skills.includes(s)) setSkills((prev) => [...prev, s]);
    setNewSkill("");
  };
  const removeSkill = (s: string) => setSkills((prev) => prev.filter((x) => x !== s));

  const tabs = ["info", "experience", "education", "skills"] as const;
  const tabLabels: Record<string, string> = {
    info: "Personal Info",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
  };

  return (
    <PortalLayout title="My Profile">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-8 text-white mb-6 shadow-lg">
          <h1 className="text-3xl font-bold">{info.fullName || "Your Name"}</h1>
          <p className="mt-1 opacity-80">{info.title || "Add your job title"}</p>
          {info.location && <p className="mt-1 text-sm opacity-70">{info.location}</p>}
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>

        {/* ── Personal Info ── */}
        {activeTab === "info" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
              {!editingInfo ? (
                <button onClick={startEditInfo} className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  <PencilIcon className="h-4 w-4" /> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={saveInfo} className="flex items-center gap-1 text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700">
                    <CheckIcon className="h-4 w-4" /> Save
                  </button>
                  <button onClick={cancelInfo} className="flex items-center gap-1 text-sm border border-gray-300 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                    <XMarkIcon className="h-4 w-4" /> Cancel
                  </button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Full Name" name="fullName" value={editingInfo ? draftInfo.fullName : info.fullName} editing={editingInfo} onChange={onInfoChange} />
              <Field label="Email" name="email" type="email" value={editingInfo ? draftInfo.email : info.email} editing={editingInfo} onChange={onInfoChange} />
              <Field label="Phone" name="phone" value={editingInfo ? draftInfo.phone : info.phone} editing={editingInfo} onChange={onInfoChange} />
              <Field label="Location" name="location" value={editingInfo ? draftInfo.location : info.location} editing={editingInfo} onChange={onInfoChange} />
              <Field label="Job Title" name="title" value={editingInfo ? draftInfo.title : info.title} editing={editingInfo} onChange={onInfoChange} />
            </div>
            <div className="mt-5">
              <Field label="Bio" name="bio" textarea value={editingInfo ? draftInfo.bio : info.bio} editing={editingInfo} onChange={onInfoChange} />
            </div>
          </div>
        )}

        {/* ── Experience ── */}
        {activeTab === "experience" && (
          <div className="space-y-4">
            {experiences.map((exp) =>
              editingExpId === exp.id && draftExp ? (
                <div key={exp.id} className="bg-white rounded-2xl border border-indigo-300 p-6 shadow-sm space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "Company", name: "company" },
                      { label: "Role / Title", name: "role" },
                      { label: "From", name: "from", type: "month" },
                      { label: "To", name: "to", type: "month" },
                    ].map(({ label, name, type }) => (
                      <div key={name}>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</label>
                        <input
                          type={type || "text"}
                          name={name}
                          value={(draftExp as any)[name]}
                          disabled={name === "to" && draftExp.current}
                          onChange={(e) => setDraftExp((prev) => prev ? { ...prev, [name]: e.target.value } : prev)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                        />
                      </div>
                    ))}
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" checked={draftExp.current} onChange={(e) => setDraftExp((prev) => prev ? { ...prev, current: e.target.checked } : prev)} className="rounded" />
                    Currently working here
                  </label>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={draftExp.description}
                      onChange={(e) => setDraftExp((prev) => prev ? { ...prev, description: e.target.value } : prev)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button onClick={saveExp} className="flex items-center gap-1 text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                      <CheckIcon className="h-4 w-4" /> Save
                    </button>
                    <button onClick={() => cancelExp(exp.id)} className="flex items-center gap-1 text-sm border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50">
                      <XMarkIcon className="h-4 w-4" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div key={exp.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{exp.role || "Role"}</p>
                      <p className="text-sm text-indigo-600">{exp.company || "Company"}</p>
                      <p className="text-xs text-gray-400 mt-1">{exp.from} — {exp.current ? "Present" : exp.to}</p>
                      {exp.description && <p className="text-sm text-gray-600 mt-2">{exp.description}</p>}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => editExp(exp)} className="text-gray-400 hover:text-indigo-600"><PencilIcon className="h-4 w-4" /></button>
                      <button onClick={() => deleteExp(exp.id)} className="text-gray-400 hover:text-red-500"><TrashIcon className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              )
            )}
            <button
              onClick={addExp}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-2xl text-sm text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
            >
              <PlusIcon className="h-4 w-4" /> Add Experience
            </button>
          </div>
        )}

        {/* ── Education ── */}
        {activeTab === "education" && (
          <div className="space-y-4">
            {educations.map((edu) =>
              editingEduId === edu.id && draftEdu ? (
                <div key={edu.id} className="bg-white rounded-2xl border border-indigo-300 p-6 shadow-sm space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "Institution", name: "institution" },
                      { label: "Degree", name: "degree" },
                      { label: "Field of Study", name: "field" },
                      { label: "From", name: "from", type: "month" },
                      { label: "To", name: "to", type: "month" },
                    ].map(({ label, name, type }) => (
                      <div key={name}>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</label>
                        <input
                          type={type || "text"}
                          value={(draftEdu as any)[name]}
                          onChange={(e) => setDraftEdu((prev) => prev ? { ...prev, [name]: e.target.value } : prev)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button onClick={saveEdu} className="flex items-center gap-1 text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                      <CheckIcon className="h-4 w-4" /> Save
                    </button>
                    <button onClick={() => { setEditingEduId(null); setDraftEdu(null); }} className="flex items-center gap-1 text-sm border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50">
                      <XMarkIcon className="h-4 w-4" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div key={edu.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                      <p className="text-sm text-indigo-600">{edu.institution}</p>
                      <p className="text-xs text-gray-400 mt-1">{edu.from} — {edu.to}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => editEdu(edu)} className="text-gray-400 hover:text-indigo-600"><PencilIcon className="h-4 w-4" /></button>
                      <button onClick={() => deleteEdu(edu.id)} className="text-gray-400 hover:text-red-500"><TrashIcon className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              )
            )}
            <button
              onClick={addEdu}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-2xl text-sm text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
            >
              <PlusIcon className="h-4 w-4" /> Add Education
            </button>
          </div>
        )}

        {/* ── Skills ── */}
        {activeTab === "skills" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {skills.length === 0 && <p className="text-sm text-gray-400 italic">No skills added yet.</p>}
              {skills.map((skill) => (
                <span key={skill} className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium px-3 py-1.5 rounded-full border border-indigo-200">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors">
                    <XMarkIcon className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. React, TypeScript..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={addSkill}
                className="flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                <PlusIcon className="h-4 w-4" /> Add
              </button>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
};

export default ProfilePage;