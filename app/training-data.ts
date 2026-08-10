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
  visual: {
    icon: string;
    label: string;
    caption: string;
  };
  feedback: Array<{
    why: string;
    consequence: string;
  }>;
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
    visual: { icon: "ID", label: "Identity checkpoint", caption: "Two similar profiles require independent identifiers." },
    feedback: [
      { why: "The expected medicine is not an identity identifier and either Maya could name the same drug.", consequence: "The wrong profile could be opened and another patient's prescription could be released or disclosed." },
      { why: "Full name and date of birth independently distinguish the two profiles before either record is selected.", consequence: "The correct patient record stays connected to the correct prescription." },
      { why: "A recent prescription date does not prove which Maya is standing at the counter.", consequence: "Recency could steer the transaction to the wrong patient and cause a wrong-patient sale." },
    ],
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
    visual: { icon: "NDC", label: "Product mismatch", caption: "Look-alike cartons can hide a different strength or dosage form." },
    feedback: [
      { why: "The same drug name can appear on several strengths and dosage forms; the mismatch alert is unresolved.", consequence: "A patient could receive an overdose, underdose, or inappropriate formulation." },
      { why: "Filling before resolving the alert lets the suspect product move deeper into the workflow.", consequence: "The wrong item could be labeled, checked, or dispensed before the mismatch is caught." },
      { why: "Comparing the prescription, NDC, strength, and dosage form resolves the exact source of the alert.", consequence: "The intended product is confirmed before production continues." },
    ],
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
    visual: { icon: "10?", label: "Unclear prescription", caption: "An unreadable strength must be clarified, not guessed." },
    feedback: [
      { why: "Holding the prescription prevents an unsupported strength from entering the workflow while the pharmacist clarifies it.", consequence: "The order remains paused until the prescriber's intended strength is confirmed." },
      { why: "A note does not make a guessed 10 mg entry accurate or authorized.", consequence: "The patient could receive one quarter of the intended dose—or the wrong dose entirely." },
      { why: "A previous fill may no longer match the current prescription and cannot replace clarification.", consequence: "A changed therapy could be silently overwritten with outdated directions." },
    ],
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
    visual: { icon: "RPh", label: "Clinical handoff", caption: "Drug-interaction questions require pharmacist assessment." },
    feedback: [
      { why: "Saying use is usually fine is patient-specific clinical advice outside the technician role.", consequence: "Ibuprofen with an anticoagulant may increase bleeding risk or delay safer treatment advice." },
      { why: "An interaction result needs clinical interpretation in the context of the patient's medicines and history.", consequence: "Raw information may be misunderstood as approval and expose the patient to preventable harm." },
      { why: "The pharmacist can assess the patient's full situation and provide authorized counseling.", consequence: "The patient receives an individualized, clinically appropriate recommendation." },
    ],
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
    visual: { icon: "GUIDE", label: "Required labeling", caption: "The Medication Guide belongs with the current dispensing." },
    feedback: [
      { why: "The required guide must accompany this dispensing, not a future one.", consequence: "The patient may leave without critical warnings or safe-use information." },
      { why: "Pausing the sale ensures the required patient labeling is supplied before completion.", consequence: "The patient receives the safety information tied to the medicine being dispensed." },
      { why: "Directing the patient to search later shifts the pharmacy's responsibility and may not meet delivery requirements.", consequence: "The patient may never see time-sensitive warnings, contraindications, or instructions." },
    ],
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
    visual: { icon: "!", label: "Adverse event", caption: "A serious reaction needs prompt clinical escalation and reporting." },
    feedback: [
      { why: "Prompt pharmacist review addresses the patient's current safety and starts the proper reporting process.", consequence: "Urgent symptoms can be assessed and the event can reach the appropriate safety system." },
      { why: "Patients and health professionals can report serious events; reporting is not limited to manufacturers.", consequence: "The reaction could go unassessed and valuable safety information could be lost." },
      { why: "A register note is not a clinical assessment and does not complete adverse-event follow-up.", consequence: "A patient needing urgent care might receive no guidance, and the event may never be reported." },
    ],
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
    visual: { icon: "C-II", label: "Red-flag review", caption: "Warning signs require pharmacist judgment—not shortcuts." },
    feedback: [
      { why: "Pausing and sharing every relevant fact lets the pharmacist evaluate the prescription appropriately.", consequence: "Potential diversion or invalid prescribing concerns are reviewed before dispensing." },
      { why: "Pressure from the patient does not resolve the red flags or replace pharmacist review.", consequence: "A potentially invalid controlled prescription could be dispensed and patient or public safety harmed." },
      { why: "Red flags require investigation; a technician should not treat them as proof or make the final refusal decision.", consequence: "A legitimate patient could be denied treatment without the required professional review." },
    ],
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
    visual: { icon: "DATE", label: "Early-fill request", caption: "Timing depends on verified facts, law, policy, and pharmacist review." },
    feedback: [
      { why: "A patient's statement does not authorize a technician to alter prescription dates or directions.", consequence: "The record could be falsified and a controlled medicine dispensed outside permitted timing." },
      { why: "A technician cannot promise a fill date before all legal, clinical, insurance, and policy checks are complete.", consequence: "The promise may be wrong and can escalate conflict or pressure staff to bypass safeguards." },
      { why: "Leaving the order unchanged preserves the record while the pharmacist verifies the request.", consequence: "Any early fill proceeds only after the relevant facts and requirements are reviewed." },
    ],
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
    visual: { icon: "#?", label: "Count discrepancy", caption: "Physical stock and the perpetual inventory do not match." },
    feedback: [
      { why: "Editing the record to the expected number conceals rather than resolves the discrepancy.", consequence: "A counting error, documentation problem, theft, or significant loss could remain hidden." },
      { why: "Securing the affected stock and notifying the pharmacist-in-charge preserves evidence for investigation.", consequence: "The discrepancy can be recounted, documented, and reported if required." },
      { why: "Waiting and counting alone delays escalation and removes independent review.", consequence: "Evidence may be lost, the discrepancy may grow, and required reporting could be delayed." },
    ],
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
    visual: { icon: "DROP", label: "Safe disposal", caption: "Unused opioids belong in an authorized take-back pathway." },
    feedback: [
      { why: "Authorized take-back options use approved collection and disposal controls.", consequence: "Unused opioids are removed from the home while limiting diversion and environmental harm." },
      { why: "An ordinary pharmacy counter is not automatically an authorized controlled-substance collection point.", consequence: "Loose opioids could be lost, diverted, mishandled, or accepted outside required controls." },
      { why: "Flushing is not the default for every medicine and should follow product-specific guidance when take-back is unavailable.", consequence: "Unnecessary flushing can cause environmental harm and still provide incorrect disposal advice." },
    ],
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
    visual: { icon: "LOCK", label: "Protected call", caption: "Knowing demographics does not establish permission to receive PHI." },
    feedback: [
      { why: "Even confirming that a prescription is ready reveals protected information about the patient.", consequence: "A sensitive treatment or condition could be disclosed to an unauthorized family member." },
      { why: "Matching demographics can help verify identity but do not prove the caller has authority to receive information.", consequence: "Protected prescription details could be released to anyone who knows basic personal data." },
      { why: "The pharmacy's verification process allows an authorized, appropriately limited disclosure when permitted.", consequence: "Patient privacy is protected while legitimate caregivers can still be assisted correctly." },
    ],
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
    visual: { icon: "QUIET", label: "Privacy safeguard", caption: "Sensitive conversations should move beyond the waiting line's hearing range." },
    feedback: [
      { why: "Continuing in place allows nearby customers to hear sensitive health information.", consequence: "The patient's diagnosis or treatment could be exposed to strangers." },
      { why: "Moving to the available private area is a reasonable safeguard for the discussion.", consequence: "The patient can speak freely without unnecessarily disclosing protected information." },
      { why: "Lowering your voice may not be enough when the line remains within hearing distance.", consequence: "Fragments of a sensitive diagnosis or medication discussion could still be overheard." },
    ],
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
    visual: { icon: "≠", label: "Register mismatch", caption: "Olivia and Olive are not interchangeable identities." },
    feedback: [
      { why: "Similar names are not proof that the bag and register belong to the same patient.", consequence: "The wrong prescription could be sold and another patient's information disclosed." },
      { why: "Showing or leading with the displayed name is not an independent identity check.", consequence: "The customer may simply agree, allowing the mismatch to pass unnoticed." },
      { why: "Stopping and verifying required identifiers resolves which patient and profile belong in the transaction.", consequence: "The correct prescription is released to the correct person and the register record stays accurate." },
    ],
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
    visual: { icon: "°F", label: "Cold-chain excursion", caption: "Returning to range does not reverse possible temperature damage." },
    feedback: [
      { why: "Quarantining the product prevents use while stability information and policy are checked.", consequence: "Potentially compromised medicine stays out of patient stock until disposition is confirmed." },
      { why: "An excursion indicator means the product's acceptability has not yet been established.", consequence: "A degraded or ineffective medicine could be dispensed to a patient." },
      { why: "Cooling the product again does not prove that potency or quality was preserved during the excursion.", consequence: "The product could look normal while no longer meeting its labeled stability requirements." },
    ],
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
    visual: { icon: "LABEL", label: "Near-miss stop", caption: "A caught error is still a chance to prevent recurrence." },
    feedback: [
      { why: "A silent correction fixes one bottle but hides how the workflow failed.", consequence: "The same labeling error could recur later and reach a patient." },
      { why: "Stopping, correcting, escalating, and documenting protects the current patient and supports system improvement.", consequence: "The immediate error is contained and the pharmacy can reduce recurrence." },
      { why: "Deleting and recreating records to remove the trace damages the audit trail and conceals the near miss.", consequence: "Investigators lose evidence, accountability is weakened, and the underlying hazard remains." },
    ],
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
