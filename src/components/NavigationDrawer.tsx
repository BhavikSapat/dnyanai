// import { FormEvent, useEffect, useState } from 'react';
// import {
//   X,
//   ArrowRight,
//   BookOpen,
//   Compass,
//   ShieldCheck,
//   MapPin,
//   Phone,
//   Heart,
//   CheckCircle2,
//   Trash2,
// } from 'lucide-react';
// import { DnyanaiLogo } from './DnyanaiLogo';
// import {
//   CourseItem,
//   COURSES_CATALOG,
//   INSTITUTE_INFO,
// } from '../data/coursesData';

// function useLockBodyScroll(isLocked: boolean) {
//   useEffect(() => {
//     if (!isLocked) return;
//     const originalOverflow = document.body.style.overflow;
//     const originalPaddingRight = document.body.style.paddingRight;
//     const scrollbarWidth =
//       window.innerWidth - document.documentElement.clientWidth;

//     document.body.style.overflow = 'hidden';
//     if (scrollbarWidth > 0) {
//       document.body.style.paddingRight = `${scrollbarWidth}px`;
//     }

//     return () => {
//       document.body.style.overflow = originalOverflow;
//       document.body.style.paddingRight = originalPaddingRight;
//     };
//   }, [isLocked]);
// }

// interface MenuDrawerProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onNavigate: (sectionId: string) => void;
//   onOpenInquiry: () => void;
//   savedCount: number;
//   onOpenSaved: () => void;
// }

// export function NavigationDrawer({
//   isOpen,
//   onClose,
//   onNavigate,
//   onOpenInquiry,
//   savedCount,
//   onOpenSaved,
// }: MenuDrawerProps) {
//   useLockBodyScroll(isOpen);

//   useEffect(() => {
//     if (!isOpen) return;
//     const handleKey = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') onClose();
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const navItems = [
//     { id: 'home', label: 'Home', subtitle: 'Institute overview & tracks', icon: Compass },
//     { id: 'recognitions', label: 'Recognitions', subtitle: 'MS-CIT & GCC-TBC Code 15433', icon: ShieldCheck },
//     { id: 'courses', label: '9 Core Courses', subtitle: 'MS-CIT, Typing, Tally, SAP & AI', icon: BookOpen },
//     { id: 'contact', label: 'Padgha Campus & Contact', subtitle: 'Address, phone & timings', icon: MapPin },
//   ];

//   return (
//     <div
//       className="fixed inset-0 z-50 flex justify-end bg-[#1E1A18]/45 backdrop-blur-xs"
//       role="dialog"
//       aria-modal="true"
//       aria-label="Navigation Menu"
//       onClick={onClose}
//     >
//       <div
//         className="no-scrollbar w-full max-w-[370px] bg-[#FCF9F7] h-full shadow-2xl p-5 sm:p-6 flex flex-col justify-between overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div>
//           <div className="flex items-center justify-between pb-4 border-b border-[#EAE0DA]">
//             <div>
//               <DnyanaiLogo variant="dark" size="sm" />
//               <div className="text-[11.5px] text-[#6D6561] mt-0.5">
//                 Computer Education · Padgha
//               </div>
//             </div>
//             <button
//               type="button"
//               onClick={onClose}
//               className="w-10 h-10 rounded-full border border-[#DFCFC6] bg-white hover:bg-[#F7EAE2] flex items-center justify-center text-[#1E1A18] cursor-pointer"
//               aria-label="Close menu"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           <nav className="mt-4 space-y-1.5" aria-label="Primary site navigation">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <button
//                   key={item.id}
//                   type="button"
//                   onClick={() => {
//                     onNavigate(item.id);
//                     onClose();
//                   }}
//                   className="w-full text-left p-3 rounded-2xl hover:bg-white border border-transparent hover:border-[#EAE0DA] flex items-center justify-between group transition-all cursor-pointer"
//                 >
//                   <div className="flex items-center gap-3">
//                     <span className="w-9 h-9 rounded-xl bg-[#F4E7DF] group-hover:bg-[#F95514] group-hover:text-white text-[#1E1A18] flex items-center justify-center transition-colors shrink-0">
//                       <Icon className="w-4 h-4" />
//                     </span>
//                     <div>
//                       <div className="text-[14px] font-semibold text-[#1E1A18]">
//                         {item.label}
//                       </div>
//                       <div className="text-[11.5px] text-[#6D6561]">
//                         {item.subtitle}
//                       </div>
//                     </div>
//                   </div>
//                   <ArrowRight className="w-4 h-4 text-[#9E928C] group-hover:text-[#F95514] transition-colors" />
//                 </button>
//               );
//             })}
//           </nav>

//           <div className="mt-4 pt-4 border-t border-[#EAE0DA]">
//             <button
//               type="button"
//               onClick={() => {
//                 onClose();
//                 onOpenSaved();
//               }}
//               className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EAE0DA] hover:border-[#D4C3B9] flex items-center justify-between text-[13.5px] font-medium text-[#1E1A18] cursor-pointer"
//             >
//               <span className="inline-flex items-center gap-2">
//                 <Heart className="w-4 h-4 text-[#EE3E24] fill-[#EE3E24]" />
//                 <span>Saved Courses</span>
//               </span>
//               <span className="text-[12px] font-semibold tabular-nums text-[#6D6561]">
//                 {savedCount}
//               </span>
//             </button>
//           </div>
//         </div>

//         <div className="pt-4 mt-4 border-t border-[#EAE0DA] space-y-3">
//           <a
//             href={`tel:${INSTITUTE_INFO.phonePrimaryRaw}`}
//             className="flex items-center gap-2 text-[13px] font-medium text-[#2A2421] hover:text-[#F95514] tabular-nums"
//           >
//             <Phone className="w-3.5 h-3.5 text-[#F95514]" />
//             <span>{INSTITUTE_INFO.phonePrimary}</span>
//           </a>

//           <button
//             type="button"
//             onClick={() => {
//               onClose();
//               onOpenInquiry();
//             }}
//             className="w-full py-3 px-5 rounded-full bg-[#F95514] hover:bg-[#E4490B] text-white font-medium text-[14.5px] shadow-[0_3px_0_#1E1A18] inline-flex items-center justify-center gap-2 cursor-pointer"
//           >
//             <span>Admission Inquiry</span>
//             <ArrowRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// interface SavedCoursesDrawerProps {
//   isOpen: boolean;
//   onClose: () => void;
//   savedCourses: CourseItem[];
//   onRemoveSaved: (courseId: string) => void;
//   onSelectCourse: (course: CourseItem) => void;
// }

// export function SavedCoursesDrawer({
//   isOpen,
//   onClose,
//   savedCourses,
//   onRemoveSaved,
//   onSelectCourse,
// }: SavedCoursesDrawerProps) {
//   useLockBodyScroll(isOpen);

//   useEffect(() => {
//     if (!isOpen) return;
//     const handleKey = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') onClose();
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex justify-end bg-[#1E1A18]/45 backdrop-blur-xs"
//       role="dialog"
//       aria-modal="true"
//       aria-label="Saved Courses"
//       onClick={onClose}
//     >
//       <div
//         className="no-scrollbar w-full max-w-[380px] bg-[#FCF9F7] h-full shadow-2xl p-5 sm:p-6 flex flex-col justify-between overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div>
//           <div className="flex items-center justify-between pb-4 border-b border-[#EAE0DA]">
//             <h2 className="text-[17px] font-semibold text-[#1E1A18]">
//               Saved Courses ({savedCourses.length})
//             </h2>
//             <button
//               type="button"
//               onClick={onClose}
//               className="w-9 h-9 rounded-full border border-[#DFCFC6] bg-white hover:bg-[#F7EAE2] flex items-center justify-center text-[#1E1A18] cursor-pointer"
//               aria-label="Close saved courses"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>

//           {savedCourses.length === 0 ? (
//             <div className="py-14 text-center space-y-2">
//               <Heart className="w-9 h-9 text-[#C8B8AF] mx-auto" />
//               <p className="text-[14.5px] font-medium text-[#1E1A18]">
//                 No saved courses
//               </p>
//               <p className="text-[12.5px] text-[#6D6561]">
//                 Tap the heart icon on any course card to bookmark it.
//               </p>
//             </div>
//           ) : (
//             <div className="mt-4 space-y-2.5">
//               {savedCourses.map((course) => (
//                 <div
//                   key={course.id}
//                   className="p-3.5 rounded-2xl bg-white border border-[#EAE0DA] space-y-2"
//                 >
//                   <div className="flex items-start justify-between gap-2">
//                     <div>
//                       <div className="text-[11.5px] text-[#6D6561]">
//                         {course.certification}
//                       </div>
//                       <h3 className="text-[14px] font-semibold text-[#1E1A18] leading-snug">
//                         {course.title}
//                       </h3>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => onRemoveSaved(course.id)}
//                       className="p-1.5 rounded-full text-[#8B7E77] hover:text-[#EE3E24] cursor-pointer"
//                       aria-label={`Remove ${course.title}`}
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                   <div className="flex items-center justify-end pt-1.5 border-t border-[#F4ECE7]">
//                     <button
//                       type="button"
//                       onClick={() => {
//                         onClose();
//                         onSelectCourse(course);
//                       }}
//                       className="text-[12.5px] font-semibold text-[#F95514] hover:underline inline-flex items-center gap-1 cursor-pointer"
//                     >
//                       <span>View &amp; Enquire</span>
//                       <ArrowRight className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <button
//           type="button"
//           onClick={onClose}
//           className="mt-4 w-full py-2.5 rounded-full border border-[#D8C8BF] bg-white hover:bg-[#F7EAE2] text-[13.5px] font-medium text-[#1E1A18] cursor-pointer"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

// interface CourseInquiryModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   selectedCourse: CourseItem | null;
// }

// export function CourseInquiryModal({
//   isOpen,
//   onClose,
//   selectedCourse,
// }: CourseInquiryModalProps) {
//   useLockBodyScroll(isOpen);

//   const [courseTitle, setCourseTitle] = useState<string>(
//     COURSES_CATALOG[0].title
//   );
//   const [name, setName] = useState('');
//   const [contact, setContact] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('Male');
//   const [qualification, setQualification] = useState('');
//   const [city, setCity] = useState('');
//   const [validationError, setValidationError] = useState('');
//   const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

//   useEffect(() => {
//     setCourseTitle(selectedCourse?.title ?? COURSES_CATALOG[0].title);
//     setStatus('idle');
//     setValidationError('');
//   }, [selectedCourse, isOpen]);

//   useEffect(() => {
//     if (!isOpen) return;
//     const handleKey = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') onClose();
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const activeCourse =
//     COURSES_CATALOG.find((c) => c.title === courseTitle) ?? selectedCourse;

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (name.trim().length < 2) {
//       setValidationError('Please enter your full name.');
//       return;
//     }
//     if (!/^[0-9+\-\s()]{8,16}$/.test(contact.trim())) {
//       setValidationError('Please enter a valid 10-digit contact number.');
//       return;
//     }
//     const numericAge = Number(age);
//     if (!age.trim() || Number.isNaN(numericAge) || numericAge < 6 || numericAge > 90) {
//       setValidationError('Please enter a valid age.');
//       return;
//     }
//     if (qualification.trim().length < 2) {
//       setValidationError('Please enter your current qualification.');
//       return;
//     }
//     if (city.trim().length < 2) {
//       setValidationError('Please enter your city or town.');
//       return;
//     }

//     setValidationError('');
//     setStatus('submitting');

//     try {
//       const response = await fetch('/api/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           course: courseTitle,
//           name: name.trim(),
//           contact: contact.trim(),
//           age: age.trim(),
//           gender,
//           qualification: qualification.trim(),
//           city: city.trim(),
//         }),
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         setStatus('success');
//       } else {
//         console.error('API returned an error:', result);
//         setStatus('error');
//       }
//     } catch (error) {
//       console.error('Fetch Error:', error);
//       setStatus('error');
//     }
//   };

//   const resetForm = () => {
//     setName('');
//     setContact('');
//     setAge('');
//     setGender('Male');
//     setQualification('');
//     setCity('');
//     setStatus('idle');
//     setValidationError('');
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1E1A18]/55 backdrop-blur-xs"
//       role="dialog"
//       aria-modal="true"
//       aria-label="Admission & Course Enquiry"
//       onClick={onClose}
//     >
//       <div
//         className="no-scrollbar w-full max-w-[510px] rounded-[24px] bg-[#FCF9F7] border border-[#EAE0DA] p-4 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between pb-3 border-b border-[#EAE0DA]">
//           <DnyanaiLogo variant="dark" size="sm" />
//           <button
//             type="button"
//             onClick={onClose}
//             className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#DFCFC6] bg-white hover:bg-[#F7EAE2] flex items-center justify-center text-[#1E1A18] cursor-pointer"
//             aria-label="Close modal"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         {status === 'success' ? (
//           <div className="py-7 text-center space-y-3.5">
//             <div className="w-12 h-12 rounded-full bg-[#E8F7EE] text-[#15803D] flex items-center justify-center mx-auto">
//               <CheckCircle2 className="w-6 h-6" />
//             </div>
//             <h3 className="text-[20px] font-semibold text-[#1E1A18]">
//               Enquiry Sent Successfully!
//             </h3>
//             <p className="text-[13.5px] text-[#6D6561] leading-relaxed max-w-sm mx-auto">
//               Thank you, <span className="font-semibold text-[#1E1A18]">{name}</span>. Our team at Dnyanai Computer Education will contact you on{' '}
//               <span className="font-semibold text-[#1E1A18] tabular-nums">{contact}</span>{' '}
//               regarding <span className="font-semibold text-[#1E1A18]">{courseTitle}</span>.
//             </p>
//             <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="px-5 py-2.5 rounded-full border border-[#D8C8BF] bg-white text-[13px] font-medium text-[#1E1A18] hover:bg-[#F7EAE2] cursor-pointer"
//               >
//                 Send Another Enquiry
//               </button>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-6 py-2.5 rounded-full bg-[#F95514] text-white font-medium text-[13px] cursor-pointer"
//               >
//                 Done
//               </button>
//             </div>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="mt-3.5 space-y-3" noValidate>
//             {/* Compact Syllabus Highlights Banner */}
//             {activeCourse && (
//               <div className="p-3 rounded-2xl bg-white border border-[#EAE0DA]">
//                 <div className="flex items-center justify-between gap-2">
//                   <span className="text-[11px] font-medium text-[#F95514]">
//                     {activeCourse.certification} · {activeCourse.shortTag}
//                   </span>
//                 </div>
//                 <ul className="mt-1.5 space-y-0.5 text-[12px] text-[#5C534F]">
//                   {activeCourse.highlights.map((h) => (
//                     <li key={h} className="truncate">
//                       • {h}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Field 1: Course */}
//             <div>
//               <label
//                 htmlFor="enq-course"
//                 className="block text-[12px] font-medium text-[#2A2421] mb-1"
//               >
//                 Course
//               </label>
//               <select
//                 id="enq-course"
//                 name="course"
//                 value={courseTitle}
//                 disabled={status === 'submitting'}
//                 onChange={(e) => setCourseTitle(e.target.value)}
//                 className="w-full h-10 px-3 rounded-xl bg-white border border-[#DFCFC6] text-[13px] text-[#1E1A18] focus:outline-none focus:border-[#F95514] disabled:opacity-60"
//               >
//                 {COURSES_CATALOG.map((c) => (
//                   <option key={c.id} value={c.title}>
//                     {c.title}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Fields 2 & 3: Name & Contact */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
//               <div>
//                 <label
//                   htmlFor="enq-name"
//                   className="block text-[12px] font-medium text-[#2A2421] mb-1"
//                 >
//                   Full Name
//                 </label>
//                 <input
//                   id="enq-name"
//                   name="name"
//                   type="text"
//                   value={name}
//                   disabled={status === 'submitting'}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Student full name"
//                   required
//                   className="w-full h-10 px-3 rounded-xl bg-white border border-[#DFCFC6] text-[13px] text-[#1E1A18] focus:outline-none focus:border-[#F95514] disabled:opacity-60"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="enq-contact"
//                   className="block text-[12px] font-medium text-[#2A2421] mb-1"
//                 >
//                   Contact Number
//                 </label>
//                 <input
//                   id="enq-contact"
//                   name="contact"
//                   type="tel"
//                   value={contact}
//                   disabled={status === 'submitting'}
//                   onChange={(e) => setContact(e.target.value)}
//                   placeholder="+91 98765 43210"
//                   required
//                   className="w-full h-10 px-3 rounded-xl bg-white border border-[#DFCFC6] text-[13px] text-[#1E1A18] focus:outline-none focus:border-[#F95514] disabled:opacity-60"
//                 />
//               </div>
//             </div>

//             {/* Fields 4, 5 & 6: Age, Gender, City */}
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
//               <div>
//                 <label
//                   htmlFor="enq-age"
//                   className="block text-[12px] font-medium text-[#2A2421] mb-1"
//                 >
//                   Age
//                 </label>
//                 <input
//                   id="enq-age"
//                   name="age"
//                   type="number"
//                   min={6}
//                   max={90}
//                   value={age}
//                   disabled={status === 'submitting'}
//                   onChange={(e) => setAge(e.target.value)}
//                   placeholder="e.g. 19"
//                   required
//                   className="w-full h-10 px-3 rounded-xl bg-white border border-[#DFCFC6] text-[13px] text-[#1E1A18] focus:outline-none focus:border-[#F95514] disabled:opacity-60 tabular-nums"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="enq-gender"
//                   className="block text-[12px] font-medium text-[#2A2421] mb-1"
//                 >
//                   Gender
//                 </label>
//                 <select
//                   id="enq-gender"
//                   name="gender"
//                   value={gender}
//                   disabled={status === 'submitting'}
//                   onChange={(e) => setGender(e.target.value)}
//                   className="w-full h-10 px-3 rounded-xl bg-white border border-[#DFCFC6] text-[13px] text-[#1E1A18] focus:outline-none focus:border-[#F95514] disabled:opacity-60"
//                 >
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               <div className="col-span-2 sm:col-span-1">
//                 <label
//                   htmlFor="enq-city"
//                   className="block text-[12px] font-medium text-[#2A2421] mb-1"
//                 >
//                   City / Town
//                 </label>
//                 <input
//                   id="enq-city"
//                   name="city"
//                   type="text"
//                   value={city}
//                   disabled={status === 'submitting'}
//                   onChange={(e) => setCity(e.target.value)}
//                   placeholder="e.g. Padgha"
//                   required
//                   className="w-full h-10 px-3 rounded-xl bg-white border border-[#DFCFC6] text-[13px] text-[#1E1A18] focus:outline-none focus:border-[#F95514] disabled:opacity-60"
//                 />
//               </div>
//             </div>

//             {/* Field 7: Qualification */}
//             <div>
//               <label
//                 htmlFor="enq-qualification"
//                 className="block text-[12px] font-medium text-[#2A2421] mb-1"
//               >
//                 Qualification
//               </label>
//               <input
//                 id="enq-qualification"
//                 name="qualification"
//                 type="text"
//                 value={qualification}
//                 disabled={status === 'submitting'}
//                 onChange={(e) => setQualification(e.target.value)}
//                 placeholder="e.g. 10th, 12th, B.Com, B.Sc, Diploma"
//                 required
//                 className="w-full h-10 px-3 rounded-xl bg-white border border-[#DFCFC6] text-[13px] text-[#1E1A18] focus:outline-none focus:border-[#F95514] disabled:opacity-60"
//               />
//             </div>

//             {validationError && (
//               <p className="text-[12px] font-medium text-[#DC2626]" role="alert">
//                 {validationError}
//               </p>
//             )}

//             {status === 'error' && (
//               <p className="text-[12px] font-medium text-[#DC2626]" role="alert">
//                 Something went wrong while sending your enquiry. Please try again.
//               </p>
//             )}

//             <button
//               type="submit"
//               disabled={status === 'submitting'}
//               className="w-full py-3 px-6 rounded-full bg-[#F95514] hover:bg-[#E4490B] text-white font-medium text-[14px] sm:text-[14.5px] shadow-[0_3px_0_#1E1A18] active:translate-y-0.5 transition-all inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed"
//             >
//               <span>
//                 {status === 'submitting'
//                   ? 'Sending Enquiry...'
//                   : 'Submit Course Enquiry'}
//               </span>
//               {status !== 'submitting' && <ArrowRight className="w-4 h-4" />}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

import { FormEvent, useEffect, useState } from "react";
import {
  X,
  ArrowRight,
  BookOpen,
  Compass,
  ShieldCheck,
  MapPin,
  Phone,
  Heart,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { DnyanaiLogo } from "./DnyanaiLogo";
import {
  CourseItem,
  COURSES_CATALOG,
  INSTITUTE_INFO,
} from "../data/coursesData";
function useLockBodyScroll(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isLocked]);
}
interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenInquiry: () => void;
  savedCount: number;
  onOpenSaved: () => void;
}
export function NavigationDrawer({
  isOpen,
  onClose,
  onNavigate,
  onOpenInquiry,
  savedCount,
  onOpenSaved,
}: MenuDrawerProps) {
  useLockBodyScroll(isOpen);
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  const navItems = [
    {
      id: "home",
      label: "Home",
      subtitle: "Institute overview & tracks",
      icon: Compass,
    },
    {
      id: "recognitions",
      label: "Recognitions",
      subtitle: "MS-CIT & GCC-TBC Code 15433",
      icon: ShieldCheck,
    },
    {
      id: "courses",
      label: "9 Core Courses",
      subtitle: "MS-CIT, Typing, Tally, SAP & AI",
      icon: BookOpen,
    },
    {
      id: "contact",
      label: "Padgha Campus & Contact",
      subtitle: "Address, phone & timings",
      icon: MapPin,
    },
  ];
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1E1A18]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      onClick={onClose}
    >
      <div
        className="no-scrollbar w-full max-w-[370px] bg-[#FCF9F7] h-full shadow-2xl p-5 sm:p-6 flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#EAE0DA]">
            <div>
              <DnyanaiLogo variant="dark" size="sm" />
              <div className="text-[11.5px] text-[#6D6561] mt-0.5">
                Computer Education · Padgha
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-[#DFCFC6] bg-white hover:bg-[#F7EAE2] flex items-center justify-center text-[#1E1A18] cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav
            className="mt-4 space-y-1.5"
            aria-label="Primary site navigation"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-2xl hover:bg-white border border-transparent hover:border-[#EAE0DA] flex items-center justify-between group transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-[#F4E7DF] group-hover:bg-[#F95514] group-hover:text-white text-[#1E1A18] flex items-center justify-center transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-[14px] font-semibold text-[#1E1A18]">
                        {item.label}
                      </div>
                      <div className="text-[11.5px] text-[#6D6561]">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#9E928C] group-hover:text-[#F95514] transition-colors" />
                </button>
              );
            })}
          </nav>
          <div className="mt-4 pt-4 border-t border-[#EAE0DA]">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSaved();
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EAE0DA] hover:border-[#D4C3B9] flex items-center justify-between text-[13.5px] font-medium text-[#1E1A18] cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#EE3E24] fill-[#EE3E24]" />
                <span>Saved Courses</span>
              </span>
              <span className="text-[12px] font-semibold tabular-nums text-[#6D6561]">
                {savedCount}
              </span>
            </button>
          </div>
        </div>
        <div className="pt-4 mt-4 border-t border-[#EAE0DA] space-y-3">
          <a
            href={`tel:${INSTITUTE_INFO.phonePrimaryRaw}`}
            className="flex items-center gap-2 text-[13px] font-medium text-[#2A2421] hover:text-[#F95514] tabular-nums"
          >
            <Phone className="w-3.5 h-3.5 text-[#F95514]" />
            <span>{INSTITUTE_INFO.phonePrimary}</span>
          </a>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenInquiry();
            }}
            className="w-full py-3 px-5 rounded-full bg-[#F95514] hover:bg-[#E4490B] text-white font-medium text-[14.5px] shadow-[0_3px_0\_#1E1A18] inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Admission Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
interface SavedCoursesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedCourses: CourseItem[];
  onRemoveSaved: (courseId: string) => void;
  onSelectCourse: (course: CourseItem) => void;
}
export function SavedCoursesDrawer({
  isOpen,
  onClose,
  savedCourses,
  onRemoveSaved,
  onSelectCourse,
}: SavedCoursesDrawerProps) {
  useLockBodyScroll(isOpen);
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1E1A18]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Saved Courses"
      onClick={onClose}
    >
      <div
        className="no-scrollbar w-full max-w-[380px] bg-[#FCF9F7] h-full shadow-2xl p-5 sm:p-6 flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#EAE0DA]">
            <h2 className="text-[17px] font-semibold text-[#1E1A18]">
              Saved Courses ({savedCourses.length})
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-[#DFCFC6] bg-white hover:bg-[#F7EAE2] flex items-center justify-center text-[#1E1A18] cursor-pointer"
              aria-label="Close saved courses"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {savedCourses.length === 0 ? (
            <div className="py-14 text-center space-y-2">
              <Heart className="w-9 h-9 text-[#C8B8AF] mx-auto" />
              <p className="text-[14.5px] font-medium text-[#1E1A18]">
                No saved courses
              </p>
              <p className="text-[12.5px] text-[#6D6561]">
                Tap the heart icon on any course card to bookmark it.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-2.5">
              {savedCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-3.5 rounded-2xl bg-white border border-[#EAE0DA] space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[11.5px] text-[#6D6561]">
                        {course.certification}
                      </div>
                      <h3 className="text-[14px] font-semibold text-[#1E1A18] leading-snug">
                        {course.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveSaved(course.id)}
                      className="p-1.5 rounded-full text-[#8B7E77] hover:text-[#EE3E24] cursor-pointer"
                      aria-label={`Remove ${course.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-end pt-1.5 border-t border-[#F4ECE7]">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectCourse(course);
                      }}
                      className="text-[12.5px] font-semibold text-[#F95514] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View &amp; Enquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full py-2.5 rounded-full border border-[#D8C8BF] bg-white hover:bg-[#F7EAE2] text-[13.5px] font-medium text-[#1E1A18] cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
interface CourseInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourse: CourseItem | null;
}
export function CourseInquiryModal({
  isOpen,
  onClose,
  selectedCourse,
}: CourseInquiryModalProps) {
  useLockBodyScroll(isOpen);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([
    COURSES_CATALOG[0].title,
  ]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [qualification, setQualification] = useState("");
  const [city, setCity] = useState("");
  const [validationError, setValidationError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  useEffect(() => {
    if (isOpen) {
      setSelectedCourses([selectedCourse?.title ?? COURSES_CATALOG[0].title]);
      setStatus("idle");
      setValidationError("");
    }
  }, [selectedCourse, isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  const activeCourses = selectedCourses
    .map((title) => COURSES_CATALOG.find((course) => course.title === title))
    .filter((course): course is CourseItem => Boolean(course));
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCourses.length === 0) {
      setValidationError("Please select at least one course.");
      return;
    }
    if (name.trim().length < 2) {
      setValidationError("Please enter your full name.");
      return;
    }
    if (!/^[0-9+\-\s()]{8,16}$/.test(contact.trim())) {
      setValidationError("Please enter a valid 10-digit contact number.");
      return;
    }
    const numericAge = Number(age);
    if (
      !age.trim() ||
      Number.isNaN(numericAge) ||
      numericAge < 6 ||
      numericAge > 90
    ) {
      setValidationError("Please enter a valid age.");
      return;
    }
    if (qualification.trim().length < 2) {
      setValidationError("Please enter your current qualification.");
      return;
    }
    if (city.trim().length < 2) {
      setValidationError("Please enter your city or town.");
      return;
    }
    setValidationError("");
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course: selectedCourses.join(", "),
          name: name.trim(),
          contact: contact.trim(),
          age: age.trim(),
          gender,
          qualification: qualification.trim(),
          city: city.trim(),
        }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setStatus("success");
      } else {
        console.error("API returned an error:", result);
        setStatus("error");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setStatus("error");
    }
  };
  const resetForm = () => {
    setSelectedCourses([selectedCourse?.title ?? COURSES_CATALOG[0].title]);
    setIsMultiSelect(false);
    setName("");
    setContact("");
    setAge("");
    setGender("Male");
    setQualification("");
    setCity("");
    setStatus("idle");
    setValidationError("");
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1E1A18]/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Admission & Course Enquiry"
      onClick={onClose}
    >
      <div
        className="no-scrollbar w-full max-w-[510px] rounded-[24px] bg-[#FCF9F7] border border-[#EAE0DA] p-4 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE0DA]">
          <div className="-my-8 sm:-my-12">
            {" "}
            <DnyanaiLogo variant="light" size="sm" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#DFCFC6] bg-white hover:bg-[#F7EAE2] flex items-center justify-center text-[#1E1A18] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {status === "success" ? (
          <div className="py-7 text-center space-y-3.5">
            <div className="w-12 h-12 rounded-full bg-[#E8F7EE] text-[#15803D] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-[20px] font-semibold text-[#1E1A18]">
              Enquiry Sent Successfully!
            </h3>
            <p className="text-[13.5px] text-[#6D6561] leading-relaxed max-w-sm mx-auto">
              Thank you,{" "}
              <span className="font-semibold text-[#1E1A18]">{name}</span>. Our
              team at Dnyanai Computer Education will contact you on{" "}
              <span className="font-semibold text-[#1E1A18] tabular-nums">
                {contact}
              </span>{" "}
              regarding{" "}
              <span className="font-semibold text-[#1E1A18]">
                {selectedCourses.join(", ")}
              </span>
              .
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 rounded-full border border-[#D8C8BF] bg-white text-[13px] font-medium text-[#1E1A18] hover:bg-[#F7EAE2] cursor-pointer"
              >
                Send Another Enquiry
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#F95514] text-white font-medium text-[13px] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-3.5 space-y-3" noValidate>
            {/* Compact syllabus highlights for every selected course */}
            {activeCourses.length > 0 && (
              <div className="space-y-2">
                {activeCourses.map((course) => (
                  <div
                    key={course.id}
                    className="p-3 rounded-2xl bg-white border border-[#EAE0DA]"
                  >
                    <div className="text-[11px] font-medium text-[#F95514]">
                      {course.certification} · {course.shortTag}
                    </div>
                    <div className="mt-1 text-[13px] font-semibold text-[#1E1A18]">
                      {course.title}
                    </div>
                    <ul className="mt-1.5 space-y-0.5 text-[12px] text-[#5C534F]">
                      {course.highlights.map((highlight) => (
                        <li key={highlight} className="truncate">
                          • {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Field 1: Course. Each additional course gets its own familiar dropdown. */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <label className="block text-[12px] font-medium text-[#2A2421]">
                  {selectedCourses.length > 1 ? "Courses" : "Course"}
                </label>
                <button
                  type="button"
                  disabled={
                    status === "submitting" ||
                    selectedCourses.length >= COURSES_CATALOG.length
                  }
                  onClick={() => {
                    const nextCourse = COURSES_CATALOG.find(
                      (course) => !selectedCourses.includes(course.title),
                    );
                    if (nextCourse)
                      setSelectedCourses((current) => [
                        ...current,
                        nextCourse.title,
                      ]);
                    setValidationError("");
                  }}
                  className="text-[11px] font-semibold text-[#F95514] hover:underline disabled:opacity-50"
                >
                  ＋ Add another course
                </button>
              </div>

              <div className="space-y-2">
                {selectedCourses.map((selectedTitle, index) => (
                  <div
                    key={`course-select-${index}`}
                    className="flex items-center gap-2"
                  >
                    <select
                      id={`enq-course-${index}`}
                      name="courses"
                      value={selectedTitle}
                      disabled={status === "submitting"}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedCourses((current) =>
                          current.map((title, courseIndex) =>
                            courseIndex === index ? value : title,
                          ),
                        );
                        setValidationError("");
                      }}
                      className="w-full h-10 px-3 rounded-xl bg-white border border-[#DFCFC6] text-[13px] text-[#1E1A18] focus:outline-none focus:border-[#F95514] disabled:opacity-60"
                    >
                      {COURSES_CATALOG.filter(
                        (course) =>
                          course.title === selectedTitle ||
                          !selectedCourses.includes(course.title),
                      ).map((course) => (
                        <option key={course.id} value={course.title}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                    {selectedCourses.length > 1 && (
                      <button
                        type="button"
                        aria-label={`Remove course ${index + 1}`}
                        title="Remove course"
                        disabled={status === "submitting"}
                        onClick={() => {
                          setSelectedCourses((current) =>
                            current.filter(
                              (_, courseIndex) => courseIndex !== index,
                            ),
                          );
                          setValidationError("");
                        }}
                        className="h-10 w-10 shrink-0 rounded-xl border border-[#DFCFC6] text-[#8B7D76] hover:border-[#F95514] hover:text-[#F95514] disabled:opacity-50"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {selectedCourses.length > 1 && (
                <p className="mt-1.5 text-[11px] text-[#6D6561]">
                  {selectedCourses.length} courses selected. Each course must be
                  different.
                </p>
              )}
            </div>
            {/* Fields 2 & 3: Name & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label
                  htmlFor="enq-name"
                  className="block text-[12px] font-medium text-[#2A2421] mb-1"
                >
                  Full Name
                </label>
                <input
                  id="enq-name"
                  name="name"
                  type="text"
                  value={name}
                  disabled={status === "submitting"}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Student full name"
                  required
                  className="w-full h-10 px-3 rounded-xl bg-white border border-[#DFCFC6] text-[13px] text-[#1E1A18] focus:outline-none focus:border-[#F95514] disabled:opacity-60"
                />
              </div>
              <div>
                <label
                  htmlFor="enq-contact"
                  className="block text-[12px] font-medium text-[#2A2421] mb-1"
                >
                  Contact Number
                </label>
                <input
                  id="enq-contact"
                  name="contact"
                  type="tel"
                  value={contact}
                  disabled={status === "submitting"}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full h-10 px-3 rounded-xl bg-white border border-[#DFCFC6] text-[13px] text-[#1E1A18] focus:outline-none focus:border-[#F95514] disabled:opacity-60"
                />
              </div>
            </div>
            {/* Fields 4, 5 & 6: Age, Gender, City */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div>
                <label
                  htmlFor="enq-age"
                  className="block text-[12px] font-medium text-[#2A2421] mb-1"
                >
                  Age
                </label>
                <input
                  id="enq-age"
                  name="age"
                  type="number"
                  min={6}
                  max={90}
                  value={age}
                  disabled={status === "submitting"}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 19"
                  required
                  className="w-full h-10 px-3 rounded-xl bg-white border border-[#DFCFC6] text-[13px] text-[#1E1A18] focus:outline-none focus:border-[#F95514] disabled:opacity-60 tabular-nums"
                />
              </div>
              <div>
                <label
                  htmlFor="enq-gender"
                  className="block text-[12px] font-medium text-[#2A2421] mb-1"
                >
                  Gender
                </label>
                <select
                  id="enq-gender"
                  name="gender"
                  value={gender}
                  disabled={status === "submitting"}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-white border border-[#DFCFC6] text-[13px] text-[#1E1A18] focus:outline-none focus:border-[#F95514] disabled:opacity-60"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="enq-city"
                  className="block text-[12px] font-medium text-[#2A2421] mb-1"
                >
                  City / Town
                </label>
                <input
                  id="enq-city"
                  name="city"
                  type="text"
                  value={city}
                  disabled={status === "submitting"}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Padgha"
                  required
                  className="w-full h-10 px-3 rounded-xl bg-white border border-[#DFCFC6] text-[13px] text-[#1E1A18] focus:outline-none focus:border-[#F95514] disabled:opacity-60"
                />
              </div>
            </div>
            {/* Field 7: Qualification */}
            <div>
              <label
                htmlFor="enq-qualification"
                className="block text-[12px] font-medium text-[#2A2421] mb-1"
              >
                Qualification
              </label>
              <input
                id="enq-qualification"
                name="qualification"
                type="text"
                value={qualification}
                disabled={status === "submitting"}
                onChange={(e) => setQualification(e.target.value)}
                placeholder="e.g. 10th, 12th, B.Com, B.Sc, Diploma"
                required
                className="w-full h-10 px-3 rounded-xl bg-white border border-[#DFCFC6] text-[13px] text-[#1E1A18] focus:outline-none focus:border-[#F95514] disabled:opacity-60"
              />
            </div>
            {validationError && (
              <p
                className="text-[12px] font-medium text-[#DC2626]"
                role="alert"
              >
                {validationError}
              </p>
            )}
            {status === "error" && (
              <p
                className="text-[12px] font-medium text-[#DC2626]"
                role="alert"
              >
                Something went wrong while sending your enquiry. Please try
                again.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-3 px-6 rounded-full bg-[#F95514] hover:bg-[#E4490B] text-white font-medium text-[14px] sm:text-[14.5px] shadow-[0_3px_0\_#1E1A18] active:translate-y-0.5 transition-all inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed"
            >
              <span>
                {status === "submitting"
                  ? "Sending Enquiry..."
                  : "Submit Course Enquiry"}
              </span>
              {status !== "submitting" && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
