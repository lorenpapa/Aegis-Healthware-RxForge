export type Source = {
  agency: "FDA" | "DEA" | "HHS";
  label: string;
  url: string;
};

export type Scenario = {
  category: string;
  station: string;
  title: string;
  detail: string;
  options: string[];
  correct: number;
  explanation: string;
  source: Source;
};

const links = {
  fdaErrors:
    "https://www.fda.gov/drugs/drug-safety-and-availability/medication-errors-related-cder-regulated-drug-products",
  fdaNames:
    "https://www.fda.gov/files/drugs/published/Safety-Considerations-for-Product-Design-to-Minimize-Medication-Errors-Guidance-for-Industry.pdf",
  fdaDrugInfo:
    "https://www.fda.gov/drugs/information-consumers-and-patients-drugs/find-information-about-drug",
  fdaLabeling:
    "https://www.fda.gov/drugs/fdas-labeling-resources-human-prescription-drugs/patient-labeling-resources",
  fdaPrescribingInfo:
    "https://www.fda.gov/drugs/fdas-labeling-resources-human-prescription-drugs/prescribing-information-resources",
  fdaMedwatch:
    "https://www.fda.gov/safety/medwatch-fda-safety-information-and-adverse-event-reporting-program",
  deaManuals: "https://www.deadiversion.usdoj.gov/pubs/manuals/manuals.html",
  deaTheftLoss:
    "https://www.deadiversion.usdoj.gov/21cfr_reports/theft/theft-loss.html",
  deaTakeback: "https://www.dea.gov/everyday-takeback-day",
  hhsFamily:
    "https://www.hhs.gov/hipaa/for-professionals/faq/disclosures-to-family-and-friends/index.html",
  hhsPrivacy: "https://www.hhs.gov/hipaa/for-professionals/privacy/index.html",
};

export const scenarios: Scenario[] = [
  {
    category: "Patient identity",
    station: "Pickup 02",
    title: "Two profiles share the same name and ZIP code.",
    detail:
      "Maya Patel arrives for pickup. The work queue contains Maya Patel and Maya R. Patel, both in ZIP code 02169. Neither profile is currently selected.",
    options: [
      "Ask which medicine she expects",
      "Verify full name and date of birth before choosing a profile",
      "Choose the profile with the newest prescription",
    ],
    correct: 1,
    explanation:
      "Verify the patient with the pharmacy's required identifiers before opening either profile. Asking what medication she expects does not distinguish two patients and may reinforce the wrong record. A recent prescription date is not proof of identity and must not be used to choose between profiles.",
    source: {
      agency: "FDA",
      label: "Medication Errors Related to CDER-Regulated Products",
      url: links.fdaErrors,
    },
  },
  {
    category: "Product selection",
    station: "Production 04",
    title: "Two cartons look almost identical.",
    detail:
      "A shelf contains two strengths of the same medicine in near-matching cartons. The barcode scan produces a product mismatch alert.",
    options: [
      "Override because the product name matches",
      "Set the alert aside and compare the cartons after filling",
      "Stop and compare the prescription, NDC, strength, and dosage form before continuing",
    ],
    correct: 2,
    explanation:
      "Stop when the scanned product does not match the system selection. Compare the prescription and stock package, including the drug, strength, dosage form, and NDC, before continuing. Matching only the drug name can miss a wrong strength or formulation. Filling first and checking later allows the wrong product to move further through production.",
    source: {
      agency: "FDA",
      label: "Safety Considerations to Minimize Medication Errors",
      url: links.fdaNames,
    },
  },
  {
    category: "Data entry",
    station: "Drop-off 01",
    title: "The strength on the image is difficult to read.",
    detail:
      "A scanned prescription could read 10 mg or 40 mg. The patient says they are usually given 'the small white one.'",
    options: [
      "Place the prescription on hold and give it to the pharmacist for clarification",
      "Enter 10 mg and leave a note",
      "Use the strength from the patient's previous fill without pharmacist review",
    ],
    correct: 0,
    explanation:
      "Do not enter a strength that cannot be read reliably. Place the prescription on hold and give it to the pharmacist for clarification. Entering 10 mg creates an unsupported order even if a note is added. A previous fill may have changed and cannot replace pharmacist review of the current prescription.",
    source: {
      agency: "FDA",
      label: "Medication Errors and Confusing Prescribing Information",
      url: links.fdaErrors,
    },
  },
  {
    category: "Clinical handoff",
    station: "Consult 01",
    title: "A patient asks about ibuprofen and a new anticoagulant.",
    detail:
      "Elena Brooks asks whether she can continue taking ibuprofen after starting a newly prescribed anticoagulant. You are working in the technician role.",
    options: [
      "Say occasional use is usually fine",
      "Read an interaction result aloud",
      "Refer the clinical question to the pharmacist",
    ],
    correct: 2,
    explanation:
      "Ask the pharmacist to speak with the patient because deciding whether ibuprofen is safe with an anticoagulant requires patient-specific clinical assessment. Saying occasional use is usually fine gives unauthorized advice and may overlook bleeding risk or other factors. Reading an interaction result aloud does not replace the pharmacist's interpretation and counseling.",
    source: {
      agency: "FDA",
      label: "Find FDA-Approved Drug Information",
      url: links.fdaDrugInfo,
    },
  },
  {
    category: "Patient labeling",
    station: "Final check 03",
    title: "The required Medication Guide is missing.",
    detail:
      "A prescription reaches will-call without the Medication Guide prompted by the dispensing system. The pickup line is growing.",
    options: [
      "Sell it and offer the guide next time",
      "Pause pickup and provide the required Medication Guide before completing the sale",
      "Tell the patient to search online later",
    ],
    correct: 1,
    explanation:
      "Do not complete pickup until the required Medication Guide is provided in the permitted form. Offering it at a later fill does not meet the current dispensing requirement. Telling the patient to find it online shifts the pharmacy's responsibility to the patient; electronic delivery is appropriate only when handled as permitted and requested by the patient.",
    source: {
      agency: "FDA",
      label: "FDA Patient Labeling Resources",
      url: links.fdaLabeling,
    },
  },
  {
    category: "Safety reporting",
    station: "Intake 02",
    title: "A patient reports a serious unexpected reaction.",
    detail:
      "A patient describes an emergency-department visit after starting a medicine and asks whether anyone tracks events like this.",
    options: [
      "Notify the pharmacist promptly and follow the adverse-event reporting procedure",
      "Say only the manufacturer can report it",
      "Document it only in the register notes",
    ],
    correct: 0,
    explanation:
      "Notify the pharmacist promptly so the patient's current condition can be assessed and urgent care can be recommended if needed. Then document and report the event through the pharmacy's process; patients and health professionals may report serious problems to MedWatch. Reporting is not limited to manufacturers, and a register note alone neither addresses immediate safety nor completes appropriate follow-up.",
    source: {
      agency: "FDA",
      label: "MedWatch Safety Reporting Program",
      url: links.fdaMedwatch,
    },
  },
  {
    category: "Controlled substances",
    station: "Pickup 01",
    title: "A controlled prescription presents multiple red flags.",
    detail:
      "A new patient requests an urgent cash fill, declines routine verification questions, and becomes insistent when told the pharmacist must review the prescription.",
    options: [
      "Pause the fill and give the pharmacist all relevant facts",
      "Fill quickly to de-escalate",
      "Refuse permanently without review",
    ],
    correct: 0,
    explanation:
      "Pause the fill and give the pharmacist all relevant facts. The pharmacist, not the technician, must determine whether the prescription was issued for a legitimate medical purpose and whether the concerns have been resolved. Filling simply to calm the patient bypasses that review. Permanently refusing on your own also exceeds the technician's role and treats warning signs as proof rather than information requiring pharmacist judgment.",
    source: {
      agency: "DEA",
      label: "DEA Pharmacist's Manual (Revised 2022)",
      url: links.deaManuals,
    },
  },
  {
    category: "Controlled substances",
    station: "Drop-off 02",
    title: "A patient requests an early controlled-substance fill.",
    detail:
      "The dispensing history suggests the request may be early. The patient says the prescriber verbally approved it.",
    options: [
      "Change the date based on the patient's statement",
      "Promise it can be filled tomorrow",
      "Leave the prescription unchanged and refer the request to the pharmacist",
    ],
    correct: 2,
    explanation:
      "Leave the prescription unchanged and ask the pharmacist to verify the timing and the patient's report of prescriber approval. A patient statement does not authorize a technician to change prescription information, and promising a fill date is inappropriate. Timing may depend on the drug's schedule, prescription, dispensing history, state law, insurer restrictions, prescriber instructions, pharmacist judgment, and pharmacy policy; federal law does not create one universal early-fill date.",
    source: {
      agency: "DEA",
      label: "DEA Pharmacist's Manual",
      url: links.deaManuals,
    },
  },
  {
    category: "Inventory control",
    station: "Secure stock",
    title: "The controlled count does not reconcile.",
    detail:
      "During a routine count, the physical quantity differs from the perpetual inventory. Another employee suggests correcting the number later when the pharmacy is quieter.",
    options: [
      "Edit the count to match the computer",
      "Stop unexplained handling of the affected stock and notify the pharmacist-in-charge",
      "Wait until closing and count alone",
    ],
    correct: 1,
    explanation:
      "Stop unexplained handling of the affected stock and notify the pharmacist-in-charge so the discrepancy can be recounted, investigated, and documented. Changing the record to match the expected number creates an inaccurate record and can hide a loss. Waiting to investigate alone delays review and makes the cause harder to determine. Not every discrepancy is a federally reportable significant loss, but the pharmacy must investigate and determine whether reporting is required.",
    source: {
      agency: "DEA",
      label: "DEA Theft/Loss Reporting",
      url: links.deaTheftLoss,
    },
  },
  {
    category: "Medication disposal",
    station: "Consult 02",
    title: "A patient brings back unused opioid tablets.",
    detail:
      "The patient asks whether to flush the tablets, throw them away, or leave them at the counter in an unmarked bag.",
    options: [
      "Recommend an authorized take-back option and follow site-specific collection rules",
      "Accept the loose bag at any pharmacy counter",
      "Tell them all medicines should be flushed",
    ],
    correct: 0,
    explanation:
      "Direct the patient to an authorized take-back location or the pharmacy's approved collection receptacle, if the site has one. Do not accept a loose bag across an ordinary pharmacy counter; controlled-substance collection must use an authorized method. Flushing is not the default for every medicine and is reserved for certain products when an appropriate take-back option is not readily available.",
    source: {
      agency: "DEA",
      label: "DEA Year-Round Drug Disposal",
      url: links.deaTakeback,
    },
  },
  {
    category: "Privacy",
    station: "Call center",
    title: "A brother calls about a sensitive prescription.",
    detail:
      "The caller knows Jordan Lee's address and date of birth, but no permission or representative status is documented. He asks whether Jordan's prescription is ready.",
    options: [
      "Confirm only the ready status",
      "Disclose because two demographics match",
      "Do not disclose independently; follow the pharmacy's verification process",
    ],
    correct: 2,
    explanation:
      "Do not independently confirm prescription information to the caller. Follow the pharmacy's process or refer the call to the pharmacist to determine whether a limited disclosure is permitted based on the caller's identity and involvement in the patient's care or payment. Knowing the patient's address and birth date does not establish authority. Saying only that it is ready can still disclose protected information.",
    source: {
      agency: "HHS",
      label: "HIPAA Disclosures to Family and Friends",
      url: links.hhsFamily,
    },
  },
  {
    category: "Privacy",
    station: "Pickup 03",
    title: "The waiting area can hear the conversation.",
    detail:
      "A patient begins discussing a sensitive diagnosis while several people stand close behind them in line.",
    options: [
      "Continue at the same volume",
      "Move the conversation to the pharmacy's available private area",
      "Speak more quietly but continue while the line remains within hearing distance",
    ],
    correct: 1,
    explanation:
      "Offer to continue in the pharmacy's available private area or away from the line. Continuing at the same volume allows others to hear protected information. Merely lowering your voice while nearby customers remain within hearing distance may not provide a reasonable safeguard for a sensitive discussion.",
    source: {
      agency: "HHS",
      label: "The HIPAA Privacy Rule",
      url: links.hhsPrivacy,
    },
  },
  {
    category: "Point of sale",
    station: "Register 02",
    title: "The bag and register show different patients.",
    detail:
      "The will-call bag says Olivia Chen, but the register displays Olive Chen after scanning. Date of birth has not been checked.",
    options: [
      "Continue because the names are close",
      "Ask the customer to confirm only the name already visible on the screen",
      "Stop the sale, verify the patient, and correct the identity mismatch",
    ],
    correct: 2,
    explanation:
      "Stop the transaction and verify the patient using the pharmacy's required identifiers before selecting a profile or releasing the bag. Similar names do not establish that the register and prescription belong to the same person. Asking the customer to repeat only the name displayed on the screen does not independently verify identity and may lead the response.",
    source: {
      agency: "FDA",
      label: "FDA Medication Error Prevention",
      url: links.fdaErrors,
    },
  },
  {
    category: "Storage",
    station: "Receiving",
    title: "A refrigerated delivery arrived outside its expected range.",
    detail:
      "The temperature indicator shows an excursion. A coworker suggests placing the product in the refrigerator and checking later.",
    options: [
      "Separate it from usable inventory and notify the pharmacist or inventory lead",
      "Return it to stock immediately",
      "Refrigerate it and release it once it returns to the normal temperature",
    ],
    correct: 0,
    explanation:
      "Keep the affected product separate from usable inventory and notify the pharmacist or designated inventory lead. FDA-approved labeling provides product-specific storage and handling conditions, while deciding whether an excursion is acceptable may also require manufacturer stability information and pharmacy policy. Returning the product to stock or merely cooling it back to the usual temperature does not establish that its quality was preserved.",
    source: {
      agency: "FDA",
      label: "FDA Prescribing Information Resources",
      url: links.fdaPrescribingInfo,
    },
  },
  {
    category: "Near miss",
    station: "Final check 01",
    title: "A label was applied to the wrong stock bottle.",
    detail:
      "The mistake is caught before the prescription reaches the patient. The production queue is busy and no harm occurred.",
    options: [
      "Correct it silently",
      "Stop the item, notify the pharmacist, correct the bottle, and document the near miss",
      "Delete and recreate the prescription so no trace remains",
    ],
    correct: 1,
    explanation:
      "Stop the item from moving forward, notify the pharmacist, correct the mislabeled bottle, and document the near miss under pharmacy policy. Correcting it silently prevents the pharmacy from identifying how the error occurred and reducing recurrence. Deleting or recreating records to hide the event damages the audit trail and does not address the underlying safety problem.",
    source: {
      agency: "FDA",
      label: "Medication Error Reporting and Prevention",
      url: links.fdaErrors,
    },
  },
];

export const sourceList: Source[] = [
  {
    agency: "FDA",
    label: "Medication Error Prevention",
    url: links.fdaErrors,
  },
  {
    agency: "FDA",
    label: "Patient Labeling Resources",
    url: links.fdaLabeling,
  },
  { agency: "FDA", label: "MedWatch", url: links.fdaMedwatch },
  { agency: "DEA", label: "Pharmacist's Manual", url: links.deaManuals },
  { agency: "DEA", label: "Drug Disposal", url: links.deaTakeback },
  { agency: "HHS", label: "HIPAA Privacy Rule", url: links.hhsPrivacy },
];
