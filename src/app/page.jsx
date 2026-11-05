"use client";

import React, { useState, useEffect, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  ShieldCheck,
  Search,
  UserPlus,
  FileSpreadsheet,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Printer,
  MessageSquare,
  RefreshCw,
  Lock,
  Building2,
  MapPin,
  CreditCard,
  Info,
  X,
} from "lucide-react";

// ==========================================
// 1. NAGPUR-SPECIFIC FICTIONAL DEMO DATASET
// ==========================================
const INITIAL_MEMBERS = [
  {
    id: "NGP-ER-001",
    name: "राजेश देशमुख (Rajesh Deshmukh)",
    mobile: "9823011223",
    pin: "1234",
    vehicleNo: "MH-31-ER-4501",
    rtoRegion: "MH-31 (Nagpur City)",
    chassisNo: "MHER31NGP00981",
    zone: "सीताबर्डी (Sitabuldi Stand)",
    bloodGroup: "B+",
    role: "Owner-Driver",
    joinedDate: "2026-01-15",
    membershipStatus: "Active",
    monthlyFee: 100,
    paidAmount: 100,
    dueAmount: 0,
    lastPaymentDate: "2026-11-01",
    receiptNo: "REC-2026-101",
    rcExpiry: "2028-05-10",
    insuranceExpiry: "2027-04-18",
    fitnessExpiry: "2027-02-20",
    docVerification: "Federation Checked"
  },
  {
    id: "NGP-ER-002",
    name: "संतोष वाघमारे (Santosh Waghmare)",
    mobile: "9422109876",
    pin: "1234",
    vehicleNo: "MH-49-ER-1892",
    rtoRegion: "MH-49 (Nagpur East)",
    chassisNo: "MHER49NGP00412",
    zone: "इतवारी रेल्वे स्टेशन (Itwari Station)",
    bloodGroup: "O+",
    role: "Owner-Driver",
    joinedDate: "2026-02-10",
    membershipStatus: "Active",
    monthlyFee: 100,
    paidAmount: 100,
    dueAmount: 0,
    lastPaymentDate: "2026-11-02",
    receiptNo: "REC-2026-102",
    rcExpiry: "2027-11-15",
    insuranceExpiry: "2026-11-14", // Expiring soon
    fitnessExpiry: "2027-06-30",
    docVerification: "Federation Checked"
  },
  {
    id: "NGP-ER-003",
    name: "मोहम्मद रफीक (Mohammed Rafiq)",
    mobile: "9765432109",
    pin: "1234",
    vehicleNo: "MH-31-ER-7734",
    rtoRegion: "MH-31 (Nagpur City)",
    chassisNo: "MHER31NGP01120",
    zone: "मोमीनपुरा / कॉटन मार्केट (Cotton Market)",
    bloodGroup: "A+",
    role: "Owner-Driver",
    joinedDate: "2026-03-05",
    membershipStatus: "Pending Dues",
    monthlyFee: 100,
    paidAmount: 0,
    dueAmount: 200, // 2 months pending
    lastPaymentDate: "2026-09-05",
    receiptNo: "REC-2026-079",
    rcExpiry: "2028-01-20",
    insuranceExpiry: "2027-08-12",
    fitnessExpiry: "2026-11-10", // Expiring soon
    docVerification: "Federation Checked"
  },
  {
    id: "NGP-ER-004",
    name: "प्रवीण बावणे (Pravin Bawane)",
    mobile: "9011223344",
    pin: "1234",
    vehicleNo: "MH-40-ER-3309",
    rtoRegion: "MH-40 (Nagpur Rural)",
    chassisNo: "MHER40NGP00219",
    zone: "मिहान / खापरी (MIHAN - Khapri)",
    bloodGroup: "AB+",
    role: "Owner (Rented Out)",
    joinedDate: "2026-04-12",
    membershipStatus: "Active",
    monthlyFee: 100,
    paidAmount: 100,
    dueAmount: 0,
    lastPaymentDate: "2026-11-03",
    receiptNo: "REC-2026-103",
    rcExpiry: "2029-02-01",
    insuranceExpiry: "2027-05-22",
    fitnessExpiry: "2027-09-10",
    docVerification: "Federation Checked"
  },
  {
    id: "NGP-ER-005",
    name: "दिनेश गजभिये (Dinesh Gajbhiye)",
    mobile: "9923456781",
    pin: "1234",
    vehicleNo: "MH-49-ER-6120",
    rtoRegion: "MH-49 (Nagpur East)",
    chassisNo: "MHER49NGP00874",
    zone: "कळमना मार्केट (Kalamna Market)",
    bloodGroup: "O+",
    role: "Owner-Driver",
    joinedDate: "2026-05-19",
    membershipStatus: "Pending Dues",
    monthlyFee: 100,
    paidAmount: 0,
    dueAmount: 100,
    lastPaymentDate: "2026-10-01",
    receiptNo: "REC-2026-088",
    rcExpiry: "2027-12-01",
    insuranceExpiry: "2027-03-15",
    fitnessExpiry: "2026-10-25", // Expired
    docVerification: "Pending Review"
  }
];

const NAGPUR_ZONES = [
  "सीताबर्डी (Sitabuldi Stand)",
  "इतवारी रेल्वे स्टेशन (Itwari Station)",
  "मोमीनपुरा / कॉटन मार्केट (Cotton Market)",
  "मिहान / खापरी (MIHAN - Khapri)",
  "कळमना मार्केट (Kalamna Market)",
  "सदर / इंदोरा चौक (Sadar / Indora Chowk)",
  "हिंगणा टी-पॉइंट (Hingna T-Point)"
];

const NAGPUR_RTOS = [
  "MH-31 (Nagpur City)",
  "MH-49 (Nagpur East)",
  "MH-40 (Nagpur Rural)"
];

// ==========================================
// 2. MARATHI-FIRST UI COPY (WITH ENGLISH HELPER LABELS)
// ==========================================
const DICT = {
  mr: {
    prototypeBanner: "प्रोटोटाइप डेमो (काल्पनिक नागपूर डेटा)",
    orgDefaultName: "नागपूर ई-रिक्षा महासंघ (प्रोटोटाइप)",
    orgDefaultSub: "नागपूर शहर व ग्रामीण विभाग (MH-31 | MH-40 | MH-49)",
    navAdmin: "१. संघ डॅशबोर्ड (Admin)",
    navMember: "२. सभासद पोर्टल (Member)",
    navIdCard: "३. ओळखपत्र व पावती (ID & Receipt)",
    navPublicQr: "४. सार्वजनिक QR तपासणी",
    totalVehicles: "नोंदणीकृत ई-रिक्षा",
    activeMembers: "सक्रिय सभासद",
    pendingDuesCount: "थकबाकीदार सभासद",
    totalCollected: "नमुना नोंदीतील जमा निधी",
    expiringDocs: "कागदपत्रे मुदत इशारा",
    searchPlaceholder: "गाडी क्रमांक (MH-31...), नाव किंवा मोबाईल नंबर शोधा...",
    addMemberBtn: "+ नवीन ई-रिक्षा / सभासद नोंदणी",
    exportCsvBtn: "Excel / CSV यादी डाउनलोड करा",
    zoneFilterAll: " सर्व झोन / स्टँड (All Zones)",
    statusFilterAll: "सर्व स्थिती (All Status)",
    viewIdBtn: "ID व पावती",
    disclaimerNote: "टीप: कागदपत्रांची स्थिती ही काल्पनिक डेमो नोंद आहे; शासकीय Parivahan / RTO API जोडलेली नाही.",
    publicQrNotice: "हा सार्वजनिक QR तपासणी व्ह्यू आहे. गोपनीयतेसाठी येथे मोबाईल नंबर, रक्तगट किंवा आर्थिक व्यवहार दिसत नाहीत."
  },
};

// Requires: npm install qrcode.react
// Date helpers use the visitor's local calendar date; date-only values are
// compared as UTC calendar days to avoid timezone boundary errors.
function getTodayIndiaIso() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function getIndiaTimeLabel() {
  return new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatDate(dateStr) {
  if (!dateStr) return "Not provided";
  const [year, month, day] = dateStr.split("-").map(Number);
  if (!year || !month || !day) return dateStr;
  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric"
  });
}

function getDocStatus(dateStr) {
  if (!dateStr) {
    return { label: "Not provided", color: "bg-slate-100 text-slate-600 border-slate-200", urgent: false };
  }
  const [year, month, day] = dateStr.split("-").map(Number);
  if (!year || !month || !day) {
    return { label: "Invalid date", color: "bg-red-100 text-red-800 border-red-300", urgent: true };
  }
  const today = getTodayIndiaIso().split("-").map(Number);
  const targetUtc = Date.UTC(year, month - 1, day);
  const todayUtc = Date.UTC(today[0], today[1] - 1, today[2]);
  const diffDays = Math.round((targetUtc - todayUtc) / 86400000);
  const displayDate = formatDate(dateStr);
  if (diffDays < 0) {
    return { label: `Expired • ${displayDate}`, color: "bg-red-100 text-red-800 border-red-300", urgent: true };
  }
  if (diffDays <= 30) {
    return { label: `Expires in ${diffDays}d • ${displayDate}`, color: "bg-amber-100 text-amber-900 border-amber-300", urgent: true };
  }
  return { label: `Valid till ${displayDate}`, color: "bg-emerald-50 text-emerald-800 border-emerald-200", urgent: false };
}

function isValidIndianMobile(value) {
  return /^[6-9]\d{9}$/.test(String(value || "").replace(/\D/g, ""));
}

function escapeCsvCell(value) {
  let text = String(value ?? "");
  // Avoid spreadsheet formula execution when exported values begin with operators.
  if (/^[\s]*[=+@\-]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export default function NagpurERickshawPortal() {
  const t = DICT.mr;

  // Admin Dashboard is the default landing screen per presentation strategy
  const [activeTab, setActiveTab] = useState("admin");

  // Prototype organisation identity (customizable for the client meeting)
  const [orgName, setOrgName] = useState(DICT.mr.orgDefaultName);
  const [orgSub, setOrgSub] = useState(DICT.mr.orgDefaultSub);
  const [helpline, setHelpline] = useState("");
  const [showOrgModal, setShowOrgModal] = useState(false);

  // Members dataset with browser-local demo persistence
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [isHydrated, setIsHydrated] = useState(false);
  const [publicQrLookupError, setPublicQrLookupError] = useState("");
  const [formError, setFormError] = useState("");
  const [auditLog, setAuditLog] = useState([
    { time: "10:15 AM", action: "Initial Nagpur demo dataset loaded (5 sample vehicles)" }
  ]);

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [zoneFilter, setZoneFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Selected member for ID card, Receipt, & Public QR view
  const [selectedMemberId, setSelectedMemberId] = useState("NGP-ER-001");

  // Member Portal Authentication State
  const [loginInput, setLoginInput] = useState("MH-31-ER-4501");
  const [loginPin, setLoginPin] = useState("1234");
  const [authenticatedMemberId, setAuthenticatedMemberId] = useState(null);
  const [loginError, setLoginError] = useState("");

  // Add New Member Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    mobile: "",
    vehicleNo: "MH-31-ER-",
    rtoRegion: NAGPUR_RTOS[0],
    chassisNo: "",
    zone: NAGPUR_ZONES[0],
    bloodGroup: "B+",
    role: "Owner-Driver",
    feePaidNow: "0",
    monthlyFee: 100,
    rcExpiry: "",
    insuranceExpiry: "",
    fitnessExpiry: ""
  });

  // Demo-only persistence: records stay in this browser and are not shared with other devices.
  useEffect(() => {
    try {
      const savedMembers = localStorage.getItem("ngp_erickshaw_members_v2");
      const savedOrg = localStorage.getItem("ngp_erickshaw_org_v2");
      if (savedMembers) {
        const parsedMembers = JSON.parse(savedMembers);
        if (Array.isArray(parsedMembers)) setMembers(parsedMembers);
      }
      if (savedOrg) {
        const parsed = JSON.parse(savedOrg);
        setOrgName(parsed.orgName || DICT.mr.orgDefaultName);
        setOrgSub(parsed.orgSub || DICT.mr.orgDefaultSub);
        const savedPhone = String(parsed.helpline || "").replace(/\D/g, "");
        setHelpline(savedPhone.length === 10 ? savedPhone : "");
      }
    } catch (e) {
      console.error("Demo data could not be loaded from this browser", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("ngp_erickshaw_members_v2", JSON.stringify(members));
    } catch (e) {
      console.error("Demo data could not be saved in this browser", e);
    }
  }, [members, isHydrated]);

  // A scanned QR reopens this app with ?verify=MEMBER_ID and selects that record.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const verifyId = new URLSearchParams(window.location.search).get("verify");
    if (!verifyId) return;
    const match = members.find((member) => member.id === verifyId);
    if (match) {
      setSelectedMemberId(match.id);
      setPublicQrLookupError("");
    } else {
      setPublicQrLookupError(verifyId);
    }
    setActiveTab("publicqr");
  }, [members]);

  const selectedMember = useMemo(
    () => members.find((m) => m.id === selectedMemberId) || members[0],
    [members, selectedMemberId]
  );

  const loggedInMember = useMemo(
    () => members.find((m) => m.id === authenticatedMemberId) || null,
    [members, authenticatedMemberId]
  );

  const verificationUrl = useMemo(() => {
    if (typeof window === "undefined" || !selectedMember) return "";
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("verify", selectedMember.id);
    return url.toString();
  }, [selectedMember]);

  // ==========================================
  // 3. DYNAMIC DASHBOARD CALCULATIONS
  // ==========================================
  const stats = useMemo(() => {
    const total = members.length;
    const active = members.filter((m) => m.membershipStatus === "Active").length;
    const pendingCount = members.filter((m) => m.dueAmount > 0).length;
    const totalCollected = members.reduce((sum, m) => sum + Number(m.paidAmount || 0), 0);
    const totalPendingRs = members.reduce((sum, m) => sum + Number(m.dueAmount || 0), 0);
    const expiringCount = members.filter(
      (m) =>
        getDocStatus(m.rcExpiry).urgent ||
        getDocStatus(m.insuranceExpiry).urgent ||
        getDocStatus(m.fitnessExpiry).urgent
    ).length;

    return { total, active, pendingCount, totalCollected, totalPendingRs, expiringCount };
  }, [members]);

  // Filtered member list for Admin table
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        m.vehicleNo.toLowerCase().includes(q) ||
        m.name.toLowerCase().includes(q) ||
        m.mobile.includes(q) ||
        m.id.toLowerCase().includes(q);
      const matchesZone = zoneFilter === "ALL" || m.zone === zoneFilter;
      const matchesStatus = statusFilter === "ALL" || m.membershipStatus === statusFilter;
      return matchesQuery && matchesZone && matchesStatus;
    });
  }, [members, searchQuery, zoneFilter, statusFilter]);

  // ==========================================
  // 4. HONEST OPERATIONAL WORKFLOW HANDLERS
  // ==========================================

  // Record a simulated fee collection and update the browser-local demo figures.
  const handleRecordPayment = (memberId) => {
    const member = members.find((item) => item.id === memberId);
    if (!member || Number(member.dueAmount || 0) <= 0) return;

    const todayStr = getTodayIndiaIso();
    const amountToClear = Number(member.dueAmount);
    const newReceipt = `REC-${todayStr.replace(/-/g, "")}-${String(Date.now()).slice(-4)}`;

    setMembers((prev) => prev.map((item) => item.id !== memberId ? item : ({
      ...item,
      paidAmount: Number(item.paidAmount || 0) + amountToClear,
      dueAmount: 0,
      membershipStatus: "Active",
      lastPaymentDate: todayStr,
      receiptNo: newReceipt
    })));

    setAuditLog((logs) => [
      { time: getIndiaTimeLabel(), action: `Demo fee collection ₹${amountToClear} recorded for ${member.vehicleNo} (${member.name}) — Receipt ${newReceipt}` },
      ...logs
    ]);
  };

  // CSV export is a real browser download; exported values are escaped safely.
  const handleExportCSV = () => {
    const headers = [
      "Member ID", "Full Name", "Mobile", "Vehicle Reg No", "RTO Office",
      "Chassis No", "Nagpur Zone/Stand", "Membership Status", "Fee Paid (INR)",
      "Pending Dues (INR)", "Last Payment Date", "Receipt No", "RC Expiry",
      "Insurance Expiry", "Fitness Expiry", "Verification Type"
    ];
    const rows = filteredMembers.map((m) => [
      m.id, m.name, m.mobile, m.vehicleNo, m.rtoRegion, m.chassisNo, m.zone,
      m.membershipStatus, m.paidAmount, m.dueAmount, m.lastPaymentDate || "N/A",
      m.receiptNo || "N/A", m.rcExpiry || "Not Provided",
      m.insuranceExpiry || "Not Provided", m.fitnessExpiry || "Not Provided",
      m.docVerification
    ]);

    const csvContent = "\uFEFF" + [headers, ...rows]
      .map((row) => row.map(escapeCsvCell).join(","))
      .join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Nagpur_Federation_Demo_Report_${getTodayIndiaIso()}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);

    setAuditLog((logs) => [
      { time: getIndiaTimeLabel(), action: `Exported demo CSV report (${filteredMembers.length} records)` },
      ...logs
    ]);
  };

  // Opens a prefilled WhatsApp draft; the user still reviews and presses Send.
  const handleWhatsAppHandoff = (member) => {
    const cleanPhone = member.mobile.replace(/\D/g, "");
    if (!isValidIndianMobile(cleanPhone)) {
      window.alert("This sample record does not have a valid 10-digit mobile number.");
      return;
    }
    const message =
      member.dueAmount > 0
        ? `नमस्कार ${member.name}, ${orgName} कडून सूचना: आपल्या ई-रिक्षा (${member.vehicleNo}) चे सभासद शुल्क ₹${member.dueAmount} बाकी आहे. कृपया कार्यालयात जमा करावे.`
        : `नमस्कार ${member.name}, ${orgName} मध्ये आपले सभासदत्व सक्रिय (Active) आहे. गाडी क्र.: ${member.vehicleNo}, पावती क्र.: ${member.receiptNo} (जमा: ₹${member.paidAmount}).`;
    const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setAuditLog((logs) => [
      { time: getIndiaTimeLabel(), action: `Opened WhatsApp draft for ${member.vehicleNo}` },
      ...logs
    ]);
  };

  // Demo registration: creates a local sample record, not a server-side member account.
  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    const fullName = newMember.name.trim();
    const mobile = newMember.mobile.replace(/\D/g, "");
    const vehicleNo = newMember.vehicleNo.trim().toUpperCase().replace(/\s+/g, "");
    const rtoCode = newMember.rtoRegion.slice(0, 5);

    if (!fullName || !vehicleNo || !mobile) {
      setFormError("कृपया नाव, मोबाईल आणि वाहन क्रमांक भरा.");
      return;
    }
    if (!isValidIndianMobile(mobile)) {
      setFormError("कृपया वैध 10-अंकी भारतीय मोबाईल नंबर भरा.");
      return;
    }
    if (!new RegExp(`^${rtoCode}-[A-Z]{1,2}-\\d{1,4}$`).test(vehicleNo)) {
      setFormError(`निवडलेल्या RTO (${rtoCode}) शी जुळणारा वाहन क्रमांक भरा. उदाहरण: ${rtoCode}-ER-1234`);
      return;
    }
    if (members.some((m) => m.vehicleNo.toUpperCase() === vehicleNo || m.mobile.replace(/\D/g, "") === mobile)) {
      setFormError("हा वाहन क्रमांक किंवा मोबाईल नंबर आधीच नमुना नोंदीत आहे.");
      return;
    }

    let nextNum = members.reduce((max, member) => {
      const match = member.id.match(/(\d+)$/);
      return Math.max(max, match ? Number(match[1]) : 0);
    }, 0) + 1;
    let newId = `NGP-ER-${String(nextNum).padStart(3, "0")}`;
    while (members.some((member) => member.id === newId)) {
      nextNum += 1;
      newId = `NGP-ER-${String(nextNum).padStart(3, "0")}`;
    }

    const paidNow = Number(newMember.feePaidNow || 0);
    const dueNow = Math.max(Number(newMember.monthlyFee || 100) - paidNow, 0);
    const todayStr = getTodayIndiaIso();
    const created = {
      id: newId,
      name: fullName,
      mobile,
      pin: "1234", // Shared demo PIN only; never use this pattern in production.
      vehicleNo,
      rtoRegion: newMember.rtoRegion,
      chassisNo: newMember.chassisNo.trim() || "NOT-PROVIDED",
      zone: newMember.zone,
      bloodGroup: newMember.bloodGroup,
      role: newMember.role,
      joinedDate: todayStr,
      membershipStatus: dueNow === 0 ? "Active" : "Pending Dues",
      monthlyFee: Number(newMember.monthlyFee || 100),
      paidAmount: paidNow,
      dueAmount: dueNow,
      lastPaymentDate: paidNow > 0 ? todayStr : "No Payment Yet",
      receiptNo: paidNow > 0 ? `REC-${todayStr.replace(/-/g, "")}-${String(Date.now()).slice(-4)}` : "UNPAID",
      rcExpiry: newMember.rcExpiry || "",
      insuranceExpiry: newMember.insuranceExpiry || "",
      fitnessExpiry: newMember.fitnessExpiry || "",
      docVerification: "Pending Federation Review"
    };

    setMembers((prev) => [created, ...prev]);
    setSelectedMemberId(created.id);
    setAuthenticatedMemberId(null);
    setLoginInput(created.vehicleNo);
    setLoginPin("1234");
    setShowAddModal(false);
    setAuditLog((logs) => [
      { time: getIndiaTimeLabel(), action: `Added demo member ${created.name} (${created.vehicleNo})` },
      ...logs
    ]);
    setNewMember({
      name: "", mobile: "", vehicleNo: "MH-31-ER-", rtoRegion: NAGPUR_RTOS[0],
      chassisNo: "", zone: NAGPUR_ZONES[0], bloodGroup: "B+", role: "Owner-Driver",
      feePaidNow: "0", monthlyFee: 100, rcExpiry: "", insuranceExpiry: "", fitnessExpiry: ""
    });
  };

  // Prototype-only login. The shared 1234 PIN is not production authentication.
  const handleMemberLogin = (e) => {
    e.preventDefault();
    const raw = loginInput.trim();
    const vehicleQuery = raw.toUpperCase().replace(/[\s-]/g, "");
    const mobileQuery = raw.replace(/\D/g, "");
    const found = members.find((m) =>
      m.vehicleNo.toUpperCase().replace(/[\s-]/g, "") === vehicleQuery ||
      m.mobile.replace(/\D/g, "") === mobileQuery ||
      m.id.toUpperCase() === raw.toUpperCase()
    );
    if (!found) {
      setLoginError("ही नोंद सापडली नाही. नमुना वाहन क्रमांक MH-31-ER-4501 वापरून पहा.");
      return;
    }
    if (loginPin.trim() !== found.pin) {
      setLoginError("चुकीचा PIN. या प्रोटोटाइपमधील नमुना PIN 1234 आहे.");
      return;
    }
    setLoginError("");
    setAuthenticatedMemberId(found.id);
    setSelectedMemberId(found.id);
  };

  // Reset Demo Data
  const handleResetDemo = () => {
    if (!window.confirm("Reset the demo records and organisation settings in this browser?")) return;
    localStorage.removeItem("ngp_erickshaw_members_v2");
    localStorage.removeItem("ngp_erickshaw_org_v2");
    setMembers(INITIAL_MEMBERS);
    setOrgName(DICT.mr.orgDefaultName);
    setOrgSub(DICT.mr.orgDefaultSub);
    setHelpline("");
    setSelectedMemberId("NGP-ER-001");
    setAuthenticatedMemberId(null);
    setLoginInput("MH-31-ER-4501");
    setLoginPin("1234");
    setLoginError("");
    setPublicQrLookupError("");
    setSearchQuery("");
    setZoneFilter("ALL");
    setStatusFilter("ALL");
    setAuditLog([{ time: getIndiaTimeLabel(), action: "Reset to the five fictional Nagpur demo records" }]);
    setActiveTab("admin");
    setShowAddModal(false);
    setShowOrgModal(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 font-sans pb-16">
      <style>{`
        @media print {
          @page { margin: 12mm; }
          body { background: #ffffff !important; }
          body * { visibility: hidden !important; }
          .print-area, .print-area * { visibility: visible !important; }
          .print-area { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; display: flex !important; flex-direction: column !important; align-items: center !important; gap: 8mm !important; }
          .print-area > * { break-inside: avoid !important; page-break-inside: avoid !important; box-shadow: none !important; }
        }
      `}</style>
      {/* ======================================================== */}
      {/* PRESENTATION CONTROLS — hidden in print mode */}
      {/* ======================================================== */}
      <div className="print:hidden bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 font-medium">
              <Info className="w-3.5 h-3.5" />
              {t.prototypeBanner}
            </span>
            <span className="hidden md:inline text-slate-400">
              | Fictional records • Browser-only demo storage
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowOrgModal(true)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              ✏️ युनियनचे नाव बदला (Customize Name)
            </button>

            <button
              onClick={handleResetDemo}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-red-950/60 text-slate-300 hover:text-red-200 border border-slate-700 transition flex items-center gap-1"
              title="Reset to default 5 Nagpur records"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* FEDERATION BRANDING & FOUR SIMPLE WORKFLOWS              */}
      {/* ======================================================== */}
      <header className="print:hidden bg-linear-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md shrink-0">
              ER
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {orgName}
                </h1>
                <span className="text-[11px] bg-emerald-800/90 text-emerald-100 border border-emerald-600/50 px-2 py-0.5 rounded font-medium">
                  Nagpur (MH-31 / MH-40 / MH-49)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-200/90 mt-0.5">{orgSub}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            {isValidIndianMobile(helpline) ? (
              <a href={`tel:${helpline}`} className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl shadow-sm transition">
                <PhoneCall className="w-4 h-4" />
                <span>कार्यालयाशी संपर्क (Call: {helpline})</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 bg-white/10 text-emerald-100 border border-white/15 text-xs px-3.5 py-2.5 rounded-xl">
                <PhoneCall className="w-4 h-4" /> कार्यालयाचा फोन कॉन्फिगर केलेला नाही (Demo)
              </span>
            )}
          </div>
        </div>

        {/* 4 Core Operational Tabs */}
        <div className="max-w-7xl mx-auto px-4 pt-1 flex overflow-x-auto gap-1.5 border-t border-emerald-800/60">
          {[
            { id: "admin", label: t.navAdmin, icon: Building2 },
            { id: "member", label: t.navMember, icon: Lock },
            { id: "idcard", label: t.navIdCard, icon: CreditCard },
            { id: "publicqr", label: t.navPublicQr, icon: QrCode }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold rounded-t-xl whitespace-nowrap transition border-b-2 ${
                  active
                    ? "bg-stone-50 text-emerald-950 border-amber-400"
                    : "text-emerald-100/80 border-transparent hover:bg-emerald-800/40 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* ======================================================== */}
      {/* MAIN CONTENT CONTAINER                                   */}
      {/* ======================================================== */}
      <main className="max-w-7xl mx-auto px-4 pt-6">
        {/* ====================================================== */}
        {/* SCREEN 1: FEDERATION COMMAND DASHBOARD (DEFAULT)       */}
        {/* ====================================================== */}
        {activeTab === "admin" && (
          <div className="space-y-6">
            {/* Prototype data disclaimer and key actions */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    महासंघ व्यवस्थापन डॅशबोर्ड (Interactive Prototype)
                  </h2>
                  <p className="text-xs text-slate-600">
                    खालील सर्व आकडे सध्याच्या <strong>{stats.total} नागपूर नमुना नोंदींवरून</strong> आपोआप मोजले आहेत. नवीन सभासद जोडल्यास किंवा शुल्क जमा केल्यास हे आकडे लगेच बदलतात.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition"
                >
                  <UserPlus className="w-4 h-4" />
                  {t.addMemberBtn}
                </button>
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-xl shadow-sm transition"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  {t.exportCsvBtn}
                </button>
              </div>
            </div>

            {/* 5 Dynamic KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-medium text-slate-500">{t.totalVehicles}</span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  {stats.total}
                </div>
                <span className="text-[11px] text-emerald-700 font-medium">
                  MH-31 / MH-40 / MH-49
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-sm">
                <span className="text-xs font-medium text-slate-500">{t.activeMembers}</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">
                  {stats.active}
                </div>
                <span className="text-[11px] text-slate-500">
                  {Math.round((stats.active / Math.max(stats.total, 1)) * 100)}% Active Rate
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm">
                <span className="text-xs font-medium text-slate-500">{t.pendingDuesCount}</span>
                <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">
                  {stats.pendingCount}
                </div>
                <span className="text-[11px] text-amber-800 font-semibold">
                  एकूण बाकी: ₹{stats.totalPendingRs}
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-medium text-slate-500">{t.totalCollected}</span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  ₹{stats.totalCollected}
                </div>
                <span className="text-[11px] text-emerald-700 font-medium">
                  Demo data only • No payment gateway
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-red-200 shadow-sm col-span-2 lg:col-span-1">
                <span className="text-xs font-medium text-slate-500">{t.expiringDocs}</span>
                <div className="text-2xl sm:text-3xl font-black text-red-600 mt-1">
                  {stats.expiringCount}
                </div>
                <span className="text-[11px] text-red-700 font-medium">
                  RC / Insurance / Fitness Alerts
                </span>
              </div>
            </div>

            {/* Search & Nagpur Zone Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="md:col-span-2 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <select
                    value={zoneFilter}
                    onChange={(e) => setZoneFilter(e.target.value)}
                    className="w-full py-2 px-3 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="ALL">{t.zoneFilterAll}</option>
                    {NAGPUR_ZONES.map((z) => (
                      <option key={z} value={z}>
                        {z}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full py-2 px-3 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="ALL">{t.statusFilterAll}</option>
                    <option value="Active">Active (सक्रिय)</option>
                    <option value="Pending Dues">Pending Dues (थकबाकी)</option>
                  </select>
                </div>
              </div>

              {/* Member Registry Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl mt-2">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 text-xs uppercase border-b border-slate-200">
                      <th className="py-3 px-3.5">गाडी व RTO (Vehicle)</th>
                      <th className="py-3 px-3.5">सभासदाचे नाव व मोबाईल</th>
                      <th className="py-3 px-3.5">नागपूर स्टँड / झोन</th>
                      <th className="py-3 px-3.5">शुल्क स्थिती (Fee Ledger)</th>
                      <th className="py-3 px-3.5">कागदपत्रे तपासणी</th>
                      <th className="py-3 px-3.5 text-right">कृती (Actions)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-sm">
                    {filteredMembers.map((m) => {
                      const rcStatus = getDocStatus(m.rcExpiry);
                      const insStatus = getDocStatus(m.insuranceExpiry);
                      const fitStatus = getDocStatus(m.fitnessExpiry);
                      return (
                        <tr key={m.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-3.5 align-top">
                            <div className="font-bold text-slate-900 font-mono text-sm">
                              {m.vehicleNo}
                            </div>
                            <div className="text-xs text-slate-500">{m.rtoRegion}</div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              ID: {m.id}
                            </div>
                          </td>

                          <td className="py-3 px-3.5 align-top">
                            <div className="font-semibold text-slate-900">{m.name}</div>
                            <div className="text-xs text-slate-600">📱 {m.mobile}</div>
                            <div className="text-[11px] text-slate-500">
                              {m.role} • रक्तगट: {m.bloodGroup}
                            </div>
                          </td>

                          <td className="py-3 px-3.5 align-top">
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md">
                              <MapPin className="w-3 h-3 text-emerald-700" />
                              {m.zone}
                            </span>
                          </td>

                          <td className="py-3 px-3.5 align-top">
                            {m.dueAmount === 0 ? (
                              <div>
                                <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                                  <CheckCircle2 className="w-3 h-3" /> जमा: ₹{m.paidAmount}
                                </span>
                                <div className="text-[11px] text-slate-500 mt-1">
                                  पावती: {m.receiptNo}
                                </div>
                              </div>
                            ) : (
                              <div>
                                <span className="inline-flex items-center gap-1 text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                                  <AlertTriangle className="w-3 h-3" /> बाकी: ₹{m.dueAmount}
                                </span>
                                <div className="text-[11px] text-slate-500 mt-1">
                                  मागील जमा: ₹{m.paidAmount}
                                </div>
                              </div>
                            )}
                          </td>

                          <td className="py-3 px-3.5 align-top space-y-1">
                            <div className={`text-[11px] px-2 py-0.5 rounded border inline-block ${rcStatus.color}`}>
                              RC: {rcStatus.label}
                            </div>
                            <br />
                            <div className={`text-[11px] px-2 py-0.5 rounded border inline-block ${insStatus.color}`}>
                              विमा (Ins): {insStatus.label}
                            </div>
                            <br />
                            <div className={`text-[11px] px-2 py-0.5 rounded border inline-block ${fitStatus.color}`}>
                              फिटनेस (Fit): {fitStatus.label}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              ✓ {m.docVerification}
                            </div>
                          </td>

                          <td className="py-3 px-3.5 align-top text-right">
                            <div className="flex flex-wrap justify-end gap-1.5">
                              {m.dueAmount > 0 && (
                                <button
                                  onClick={() => handleRecordPayment(m.id)}
                                  className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition"
                                >
                                  + ₹{m.dueAmount} नमुना पेमेंट नोंदवा
                                </button>
                              )}

                              <button
                                onClick={() => {
                                  setSelectedMemberId(m.id);
                                  setActiveTab("idcard");
                                }}
                                className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-semibold text-xs rounded-lg transition"
                              >
                                {t.viewIdBtn}
                              </button>

                              <button
                                onClick={() => handleWhatsAppHandoff(m)}
                                className="px-2.5 py-1.5 bg-green-600 hover:bg-green-700 text-white font-semibold text-xs rounded-lg transition inline-flex items-center gap-1"
                                title="Opens WhatsApp with a prefilled draft; the user must press Send"
                              >
                                <MessageSquare className="w-3 h-3" /> WhatsApp Draft
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-slate-500 italic">{t.disclaimerNote} नमुना स्टँड / झोनची नावे महासंघाकडून पुष्टी करून घ्यावीत.</p>
              <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">₹100 हा फक्त नमुना शुल्क दर आहे; महासंघाकडून पुष्टी आवश्यक. डेमोमध्ये पेमेंट होत नाही. CSV डाउनलोड, प्रिंट, फोन कॉल लिंक आणि WhatsApp draft ही ब्राउझर actions आहेत.</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-3">अलीकडील डेमो कृती (Recent Demo Activity)</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto text-xs">
                {auditLog.slice(0, 5).map((item, idx) => (
                  <div key={`${item.time}-${idx}`} className="flex items-start gap-2 text-slate-600 border-b border-slate-100 pb-1.5">
                    <span className="font-mono text-[11px] text-slate-400 shrink-0">{item.time}</span>
                    <span>{item.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================== */}
        {/* SCREEN 2: MEMBER PORTAL (PROTOTYPE LOGIN)              */}
        {/* ====================================================== */}
        {activeTab === "member" && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Member Login Box with PIN Security */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-700" />
                    सभासद पोर्टल (Member Portal — Demo Login)
                  </h2>
                  <p className="text-xs text-slate-500">गोपनीयता दाखवण्यासाठी नमुना PIN वापरला आहे; हे production authentication नाही.</p>
                </div>

                {/* Quick Demo Switcher for Client Presentation */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-500">Quick Test:</span>
                  {members.slice(0, 3).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setLoginInput(m.vehicleNo);
                        setLoginPin(m.pin);
                        setLoginError("");
                      }}
                      className="text-xs bg-slate-100 hover:bg-emerald-50 text-slate-800 border border-slate-300 px-2 py-1 rounded font-mono"
                    >
                      {m.vehicleNo.slice(-4)}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleMemberLogin} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    गाडी क्रमांक / मोबाईल नंबर
                  </label>
                  <input
                    type="text"
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    placeholder="MH-31-ER-4501"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Demo PIN (सर्व नमुना सभासदांसाठी: 1234)
                  </label>
                  <input
                    type="password"
                    value={loginPin}
                    onChange={(e) => setLoginPin(e.target.value)}
                    placeholder="1234"
                    maxLength={4}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm py-2 px-4 rounded-lg transition"
                  >
                    प्रोफाईल पहा (Login)
                  </button>
                </div>
              </form>

              <p className="mt-2 text-[11px] text-slate-500">हा 1234 PIN फक्त क्लिक-थ्रू प्रोटोटाइपसाठी आहे. अंतिम प्रणालीमध्ये OTP / सुरक्षित खाते प्रमाणीकरण आवश्यक असेल.</p>
              {loginError && (
                <div className="mt-3 text-xs text-red-700 bg-red-50 border border-red-200 p-2.5 rounded-lg">
                  {loginError}
                </div>
              )}
            </div>

            {/* Member Profile: shown only after the demo login form is submitted */}
            {loggedInMember && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-linear-to-r from-emerald-900 to-slate-900 text-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                      {loggedInMember.rtoRegion} • {loggedInMember.id}
                    </span>
                    <h3 className="text-xl font-bold mt-0.5">{loggedInMember.name}</h3>
                    <p className="text-xs text-emerald-200 mt-0.5">
                      गाडी क्र.: <strong className="font-mono text-sm text-white">{loggedInMember.vehicleNo}</strong> | झोन: {loggedInMember.zone}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end gap-2">
                    {loggedInMember.dueAmount === 0 ? (
                      <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-full">
                        <CheckCircle2 className="w-4 h-4" /> सक्रिय सभासद (Active)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-full">
                        <AlertTriangle className="w-4 h-4" /> शुल्क बाकी: ₹{loggedInMember.dueAmount}
                      </span>
                    )}
                    <button
                      onClick={() => {
                        setSelectedMemberId(loggedInMember.id);
                        setActiveTab("idcard");
                      }}
                      className="text-xs bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-lg font-semibold transition"
                    >
                      ओळखपत्र व पावती पहा (View ID & Receipt) →
                    </button>
                  </div>
                </div>

                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-800 text-xs uppercase">
                      १. वाहन व वैयक्तिक माहिती
                    </h4>
                    <div className="flex justify-between">
                      <span className="text-slate-500">गाडी क्रमांक:</span>
                      <span className="font-mono font-bold">{loggedInMember.vehicleNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">चेसिस क्रमांक:</span>
                      <span className="font-mono text-xs">{loggedInMember.chassisNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">रक्तगट (Blood Group):</span>
                      <span className="font-bold text-red-700">{loggedInMember.bloodGroup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">मोबाईल:</span>
                      <span>{loggedInMember.mobile}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-800 text-xs uppercase">
                      २. सभासद शुल्क खाते (Fee Ledger)
                    </h4>
                    <div className="flex justify-between">
                      <span className="text-slate-500">नमुना मासिक शुल्क:</span>
                      <span className="font-semibold">₹{loggedInMember.monthlyFee} / महिना</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">एकूण जमा रक्कम:</span>
                      <span className="font-bold text-emerald-700">₹{loggedInMember.paidAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">थकबाकी (Pending Dues):</span>
                      <span className={`font-bold ${loggedInMember.dueAmount > 0 ? "text-red-600" : "text-slate-700"}`}>
                        ₹{loggedInMember.dueAmount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">शेवटची पावती क्र.:</span>
                      <span className="font-mono text-xs">{loggedInMember.receiptNo}</span>
                    </div>
                  </div>

                  <div className="md:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-800 text-xs uppercase">
                        ३. कागदपत्रे मुदत स्थिती (Federation Manual Verification)
                      </h4>
                      <span className="text-[11px] text-slate-500">
                        स्थिती: {loggedInMember.docVerification}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      <div className={`p-2.5 rounded-lg border text-xs ${getDocStatus(loggedInMember.rcExpiry).color}`}>
                        <div className="font-bold">RC नोंदणी मुदत</div>
                        <div>{getDocStatus(loggedInMember.rcExpiry).label}</div>
                      </div>
                      <div className={`p-2.5 rounded-lg border text-xs ${getDocStatus(loggedInMember.insuranceExpiry).color}`}>
                        <div className="font-bold">विमा (Insurance)</div>
                        <div>{getDocStatus(loggedInMember.insuranceExpiry).label}</div>
                      </div>
                      <div className={`p-2.5 rounded-lg border text-xs ${getDocStatus(loggedInMember.fitnessExpiry).color}`}>
                        <div className="font-bold">फिटनेस प्रमाणपत्र</div>
                        <div>{getDocStatus(loggedInMember.fitnessExpiry).label}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ====================================================== */}
        {/* SCREEN 3: SAMPLE MEMBER ID & RECEIPT                     */}
        {/* ====================================================== */}
        {activeTab === "idcard" && (
          <div className="space-y-6">
            {/* Member Selector & Print Trigger (Hidden during print) */}
            <div className="print:hidden bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-slate-700">सभासद निवडा (Select Member):</label>
                <select
                  value={selectedMember.id}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  className="py-2 px-3 text-sm border border-slate-300 rounded-lg bg-white font-medium"
                >
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.vehicleNo} — {m.name} ({m.dueAmount > 0 ? `बाकी ₹${m.dueAmount}` : "Paid"})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
                >
                  <Printer className="w-4 h-4" />
                  ID + पावती प्रिंट / Save as PDF
                </button>
                <button
                  onClick={() => setActiveTab("publicqr")}
                  className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-xl transition"
                >
                  <QrCode className="w-4 h-4 text-amber-400" />
                  Test QR Scan View
                </button>
              </div>
            </div>

            <div className="print-area grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* 1. SAMPLE FEDERATION MEMBER ID CARD */}
              <div className="bg-white rounded-2xl border-2 border-emerald-900 shadow-md overflow-hidden max-w-md mx-auto w-full">
                <div className="bg-emerald-950 text-white p-4 text-center border-b-4 border-amber-400">
                  <div className="text-[11px] uppercase tracking-widest text-amber-300 font-bold">
                    सभासद ओळखपत्र • Member ID (Prototype)
                  </div>
                  <h3 className="text-base font-extrabold mt-0.5">{orgName}</h3>
                  <p className="text-[11px] text-emerald-200">{orgSub}</p>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 text-sm">
                      <span className="inline-block text-[11px] font-mono font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-300">
                        ID: {selectedMember.id}
                      </span>
                      <h4 className="text-lg font-bold text-slate-900">{selectedMember.name}</h4>
                      <div className="text-xs font-mono font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block">
                        गाडी क्र.: {selectedMember.vehicleNo}
                      </div>
                      <p className="text-xs text-slate-600">
                        <strong>स्टँड/झोन:</strong> {selectedMember.zone}
                      </p>
                      <p className="text-xs text-slate-600">
                        <strong>भूमिका:</strong> {selectedMember.role}
                      </p>
                    </div>

                    <div className="flex flex-col items-center shrink-0">
                      {verificationUrl ? (
                        <QRCodeSVG value={verificationUrl} size={112} level="M" includeMargin />
                      ) : (
                        <div className="w-28 h-28 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-500">QR preview</div>
                      )}
                      <span className="text-[10px] text-slate-500 mt-1 font-mono">
                        SCAN • DEMO RECORD
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-500">सभासद स्थिती: </span>
                      <strong
                        className={
                          selectedMember.dueAmount === 0 ? "text-emerald-700" : "text-amber-700"
                        }
                      >
                        {selectedMember.membershipStatus}
                      </strong>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500">संपर्क: </span>
                      <strong className="font-mono">{isValidIndianMobile(helpline) ? helpline : "कार्यालयातून पुष्टी करा"}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. DYNAMIC, ACCURATE FEE RECEIPT / DUE STATEMENT */}
              <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-md overflow-hidden max-w-md mx-auto w-full">
                <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-amber-400 font-bold uppercase">
                      {selectedMember.dueAmount > 0
                        ? "नमुना थकबाकी पत्रक (Demo Dues Statement)"
                        : "नमुना शुल्क पावती (Demo Fee Receipt)"}
                    </div>
                    <h3 className="text-sm font-bold mt-0.5">{orgName}</h3>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <div>{selectedMember.receiptNo}</div>
                    <div className="text-slate-400">{selectedMember.lastPaymentDate === "No Payment Yet" ? "No payment yet" : formatDate(selectedMember.lastPaymentDate)}</div>
                  </div>
                </div>

                <div className="p-5 space-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">सभासदाचे नाव:</span>
                    <span className="font-bold">{selectedMember.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">ई-रिक्षा क्रमांक:</span>
                    <span className="font-mono font-bold">{selectedMember.vehicleNo}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">नागपूर झोन:</span>
                    <span>{selectedMember.zone}</span>
                  </div>

                  {/* Accurate Financial Reflection (Fixes the always-Rs-100 bug) */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">नमुना मासिक सभासद शुल्क (₹100; पुष्टी आवश्यक):</span>
                      <span className="font-semibold">₹{selectedMember.monthlyFee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700 font-medium">जमा झालेली रक्कम (Paid):</span>
                      <span className="font-bold text-emerald-700">₹{selectedMember.paidAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-1 border-t border-slate-200">
                      <span className="text-slate-800 font-bold">सध्याची थकबाकी (Balance Due):</span>
                      <span
                        className={`font-black ${
                          selectedMember.dueAmount > 0 ? "text-red-600" : "text-emerald-700"
                        }`}
                      >
                        ₹{selectedMember.dueAmount}
                      </span>
                    </div>
                  </div>

                  {selectedMember.dueAmount > 0 ? (
                    <div className="print:hidden flex items-center justify-between bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs">
                      <span className="text-amber-900 font-medium">
                        या सभासदाचे ₹{selectedMember.dueAmount} शुल्क बाकी आहे.
                      </span>
                      <button
                        onClick={() => handleRecordPayment(selectedMember.id)}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg"
                      >
                        नमुना पेमेंट नोंदवा (Record Demo Payment)
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-center font-semibold">
                      ✓ संपूर्ण शुल्क जमा आहे — कोणतीही थकबाकी नाही.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================== */}
        {/* SCREEN 4: PRIVACY-SAFE FEDERATION RECORD LOOKUP         */}
        {/* ====================================================== */}
        {activeTab === "publicqr" && (
          <div className="max-w-lg mx-auto space-y-4">
            {publicQrLookupError ? (
              <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 text-sm text-amber-950">
                <strong>हा नमुना रेकॉर्ड या उपकरणावर उपलब्ध नाही.</strong>
                <p className="mt-1">हा prototype browser-local storage वापरतो. दुसऱ्या फोनवर नव्याने जोडलेले रेकॉर्ड दिसण्यासाठी backend / shared database जोडणे आवश्यक आहे. रेकॉर्ड ID: {publicQrLookupError}</p>
              </div>
            ) : null}
            <div className="bg-amber-50 border border-amber-300 text-amber-950 p-3.5 rounded-xl text-xs flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>गोपनीयता संरक्षण (Privacy-Protected Public QR View):</strong> {t.publicQrNotice}
              </div>
            </div>

            {!publicQrLookupError && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
              <div className="bg-emerald-900 text-white p-5 text-center">
                <div className="inline-flex items-center gap-1.5 bg-emerald-800 text-emerald-100 text-xs px-3 py-1 rounded-full mb-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  महासंघ सदस्य नोंद तपासणी (Demo Record Lookup)
                </div>
                <h3 className="text-lg font-bold">{orgName}</h3>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs text-slate-500">ई-रिक्षा क्रमांक (Vehicle):</span>
                  <span className="font-mono text-base font-black text-slate-900">
                    {selectedMember.vehicleNo}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs text-slate-500">सभासदाचे नाव:</span>
                  <span className="font-bold text-slate-900">{selectedMember.name}</span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs text-slate-500">नोंदणीकृत झोन / स्टँड:</span>
                  <span className="text-sm font-medium text-slate-800">{selectedMember.zone}</span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs text-slate-500">महासंघ सभासद स्थिती:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      selectedMember.membershipStatus === "Active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {selectedMember.membershipStatus}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-800">
                    लपवलेली खाजगी माहिती (Restricted for Member Privacy):
                  </div>
                  <div>• मोबाईल नंबर, रक्तगट, चेसिस नंबर आणि आर्थिक व्यवहार सार्वजनिक QR वर दिसत नाहीत.</div>
                </div>

                {isValidIndianMobile(helpline) ? (
                  <a href={`tel:${helpline}`} className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3 rounded-xl transition">
                    <PhoneCall className="w-4 h-4 text-emerald-400" /> कार्यालयाशी संपर्क ({helpline})
                  </a>
                ) : (
                  <div className="text-center text-xs text-slate-500">कार्यालयाचा संपर्क क्रमांक अद्याप कॉन्फिगर केलेला नाही.</div>
                )}
              </div>
            </div>
            )}
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* MODAL 1: REGISTER NEW NAGPUR MEMBER & VEHICLE            */}
      {/* ======================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                नवीन नागपूर ई-रिक्षा व सभासद नोंदणी
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMemberSubmit} className="space-y-3 text-sm">
              <p className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">ही नोंद फक्त या browser मधील demo dataset मध्ये सेव्ह होईल. नमुना PIN: 1234.</p>
              {formError ? <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{formError}</div> : null}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    सभासदाचे पूर्ण नाव *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="उदा. नितीन मेश्राम"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    मोबाईल नंबर *
                  </label>
                  <input
                    type="tel"
                    required
                    inputMode="numeric"
                    pattern="[6-9][0-9]{9}"
                    maxLength={10}
                    value={newMember.mobile}
                    onChange={(e) => setNewMember({ ...newMember, mobile: e.target.value })}
                    placeholder="9823XXXXXX"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    नागपूर RTO विभाग
                  </label>
                  <select
                    value={newMember.rtoRegion}
                    onChange={(e) => {
                      const code = e.target.value.slice(0, 5);
                      setNewMember({
                        ...newMember,
                        rtoRegion: e.target.value,
                        vehicleNo: `${code}-ER-`
                      });
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    {NAGPUR_RTOS.map((rto) => (
                      <option key={rto} value={rto}>
                        {rto}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ई-रिक्षा क्रमांक *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMember.vehicleNo}
                    onChange={(e) => setNewMember({ ...newMember, vehicleNo: e.target.value })}
                    placeholder="MH-31-ER-9901"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    नागपूर स्टँड / झोन
                  </label>
                  <select
                    value={newMember.zone}
                    onChange={(e) => setNewMember({ ...newMember, zone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    {NAGPUR_ZONES.map((z) => (
                      <option key={z} value={z}>
                        {z}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    आज जमा केलेले नमुना शुल्क (₹100 पैकी; पुष्टी आवश्यक)
                  </label>
                  <select
                    value={newMember.feePaidNow}
                    onChange={(e) => setNewMember({ ...newMember, feePaidNow: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-semibold"
                  >
                    <option value="100">₹100 — पूर्ण जमा (Paid)</option>
                    <option value="0">₹0 — बाकी (Pending Dues ₹100)</option>
                  </select>
                </div>
              </div>

              {/* Optional document expiry inputs: blank means not supplied, not valid. */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    RC मुदत (Registration Certificate Expiry - Optional)
                  </label>
                  <input
                    type="date"
                    value={newMember.rcExpiry}
                    onChange={(e) => setNewMember({ ...newMember, rcExpiry: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    विमा मुदत (Insurance Expiry - Optional)
                  </label>
                  <input
                    type="date"
                    value={newMember.insuranceExpiry}
                    onChange={(e) =>
                      setNewMember({ ...newMember, insuranceExpiry: e.target.value })
                    }
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    फिटनेस मुदत (Fitness Expiry - Optional)
                  </label>
                  <input
                    type="date"
                    value={newMember.fitnessExpiry}
                    onChange={(e) =>
                      setNewMember({ ...newMember, fitnessExpiry: e.target.value })
                    }
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  रद्द करा (Cancel)
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg shadow-sm"
                >
                  नोंदणी सेव्ह करा (Save Member)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: CUSTOMIZE FEDERATION NAME BEFORE CLIENT MEETING */}
      {/* ======================================================== */}
      {showOrgModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                संघटनेचे नाव व हेल्पलाईन बदला
              </h3>
              <button
                onClick={() => setShowOrgModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  महासंघाचे नाव (Federation Name)
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  विभाग / उप-शीर्षक (Subtitle / City)
                </label>
                <input
                  type="text"
                  value={orgSub}
                  onChange={(e) => setOrgSub(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  कार्यालयाचा संपर्क क्रमांक (Office Phone — Call Only)
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit mobile number (optional)"
                  value={helpline}
                  onChange={(e) => setHelpline(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-1">खरा कार्यालयीन क्रमांक पुष्टी झाल्यावरच भरा. हा फक्त फोन कॉल लिंक आहे; SOS dispatch नाही.</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => {
                  localStorage.setItem(
                    "ngp_erickshaw_org_v2",
                    JSON.stringify({ orgName, orgSub, helpline })
                  );
                  setShowOrgModal(false);
                }}
                className="px-5 py-2 text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg"
              >
                सेव्ह करा (Apply & Save)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// End of main component