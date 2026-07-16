import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";
const KEY = "zill-lang";

/**
 * Arabic → English dictionary for the Zill app.
 * Covers every visible string that appears in JSX across all screens.
 * Look-up is done after `.trim()`, and any leading/trailing whitespace on the
 * original DOM text is preserved when the translation is substituted.
 */
export const DICT: Record<string, string> = {
  // Brand / core
  "ظل": "Zill",
  "بنك الإنماء": "Alinma Bank",
  "بنك الإنماء ٢٠٢٦": "Alinma Bank 2026",
  "حماية بنك الإنماء الذكية": "Alinma Bank Smart Protection",
  "طبقة الحماية الذكية داخل تطبيق بنك الإنماء، توقف الاحتيال قبل حدوثه.":
    "The smart protection layer inside the Alinma Bank app, stopping fraud before it happens.",
  "طبقة الحماية الذكية من الاحتيال داخل تطبيق بنك الإنماء.":
    "The smart anti-fraud layer inside the Alinma Bank app.",
  "رفيقك الذكي للحماية المالية": "Your smart companion for financial protection",
  "رفيقك الذكي للحماية المالية داخل تطبيق بنك الإنماء.":
    "Your smart companion for financial protection inside the Alinma Bank app.",
  "الدخول إلى منظومة الحماية الذكية": "Entering the smart protection system",
  "جاري تجهيز طبقة الحماية": "Preparing your protection layer",
  "مرخّص من البنك المركزي السعودي (ساما)": "Licensed by the Saudi Central Bank (SAMA)",
  "الإصدار ٤٫١٢٫٠": "Version 4.12.0",
  "محمي بتشفير": "Protected by encryption",
  "ابدأ الآن": "Start Now",
  "يحمي معاملاتك ويكتشف محاولات الاحتيال قبل وقوعها باستخدام الذكاء الاصطناعي.":
    "Protects your transactions and detects fraud attempts before they happen using AI.",



  // Tab bar / nav
  "الرئيسية": "Home",
  "التنبيهات": "Alerts",
  "التقارير": "Reports",
  "الحساب": "Account",
  "الإشعارات": "Notifications",
  "الإعدادات": "Settings",
  "رجوع": "Back",
  "العودة للرئيسية": "Back to Home",
  "العودة إلى الرئيسية": "Back to Home",
  "الصفحة غير موجودة": "Page not found",
  "الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.": "The page you are looking for is not available or has been moved.",
  "تعذّر تحميل الصفحة": "Failed to load page",
  "حدث خطأ غير متوقع. يمكنك إعادة المحاولة أو العودة للرئيسية.":
    "An unexpected error occurred. You can retry or return to the home page.",
  "إعادة المحاولة": "Retry",
  "٤٠٤": "404",

  // Login
  "تسجيل الدخول": "Sign In",
  "تسجيل الخروج": "Sign Out",
  "اسم المستخدم": "Username",
  "كلمة المرور": "Password",
  "نسيت كلمة المرور؟": "Forgot password?",
  "رقم الهوية": "National ID",
  "إظهار": "Show",
  "إخفاء": "Hide",
  "بصمة الإصبع": "Fingerprint",
  "بصمة": "Fingerprint",
  "مسح الوجه ثلاثي الأبعاد.": "3D face scan.",
  "ضع إصبعك على المستشعر": "Place your finger on the sensor",
  "انظر إلى الكاميرا": "Look at the camera",
  "تغيير اللغة": "Change language",
  "تبديل المظهر": "Toggle theme",

  // Login extras
  "أدخل بياناتك للوصول إلى منصة الحماية المالية":
    "Enter your details to access the financial protection platform",
  "اسم المستخدم أو رقم الهوية": "Username or National ID",
  "دخول باستخدام Face ID": "Sign in with Face ID",
  "فتح حساب جديد": "Open a new account",
  "محمي بتشفير AES-256": "Protected by AES-256 encryption",



  // Theme picker
  "🎨 المظهر": "🎨 Appearance",
  "المظهر": "Appearance",
  "🌙 الوضع الداكن": "🌙 Dark Mode",
  "☀️ الوضع الفاتح": "☀️ Light Mode",
  "📱 مطابق للجهاز": "📱 Match Device",
  "الوضع الداكن": "Dark Mode",
  "الوضع الفاتح": "Light Mode",
  "مطابق للجهاز": "Match Device",
  "خلفية كحلي فاخر": "Deep premium navy background",
  "خلفية بيضاء هادئة": "Soft white background",
  "يتبع إعدادات نظامك": "Follows your system settings",

  // Language section
  "اللغة / Language": "Language / اللغة",
  "اللغة": "Language",
  "العربية": "Arabic",
  "English": "English",

  // Dashboard greetings & core
  "صباح الخير": "Good morning",
  "مرحباً، محمد عبدالله": "Welcome, Mohammed Abdullah",
  "مرحبًا محمد": "Hi Mohammed",
  "محمد عبدالله": "Mohammed Abdullah",
  "محمد عبدالله.": "Mohammed Abdullah.",
  "أنت": "You",
  "ظل يراقب رحلتك المالية لحمايتك قبل الاحتيال.":
    "Zill watches your financial journey to protect you before fraud happens.",
  "درجة الحماية": "Protection Score",
  "من ١٠٠": "of 100",
  "مؤشر ذكي يقيس مستوى تأمين حسابك الآن": "A smart indicator measuring how secured your account is right now",
  "حالة الحماية الآن": "Protection Status Now",
  "حمايتك مفعّلة": "Your protection is active",
  "حسابك محمي": "Your account is protected",
  "مفعّل": "Active",
  "آخر مزامنة للحماية قبل ٣ دقائق": "Protection last synced 3 minutes ago",
  "تمت مراقبة آخر عملية بنجاح": "Your last transaction was monitored successfully",
  "آخر نشاط ذكي": "Latest smart activity",
  "أدوات ظل السريعة": "Zill Quick Tools",
  "افحص الآن": "Scan Now",
  "افحص رسالة مشبوهة": "Scan a suspicious message",
  "افحص أي رسالة مشبوهة": "Scan any suspicious message",
  "اختر ما تريد فحصه، وسيعمل ظل خلال ثوانٍ.": "Choose what to scan and Zill will act within seconds.",
  "تحليل رسالة": "Message Analysis",
  "فحص رابط": "Link Check",
  "بدء تحويل": "Start Transfer",
  "التوأم المالي": "Financial Twin",
  "التوأم المالي ": "Financial Twin",
  "تحقق قبل الضغط": "Verify before you tap",
  "تحقق قبل أن تضغط": "Verify before you tap",
  "حماية تحويل": "Transfer protection",
  "مع تحليل المخاطر": "With risk analysis",
  "تعلّم كيف تحمي نفسك": "Learn how to protect yourself",
  "تعلّم كيف تحمي أموالك": "Learn how to protect your money",
  "مركز التوعية": "Awareness Center",
  "٥ نصائح جديدة هذا الأسبوع": "5 new tips this week",
  "شاهد كيف يمنع ظل عملية احتيال حقيقية": "See how Zill blocks a real fraud attempt",
  "تشغيل المحاكاة": "Run Simulation",
  "محاكاة": "Simulation",
  "إحصائيات الحماية": "Protection Stats",
  "هذا الشهر": "This month",
  "احتيال أُوقف": "Fraud blocked",
  "رسائل حُلّلت": "Messages analyzed",
  "روابط فُحصت": "Links scanned",
  "عمليات محمية": "Transactions protected",
  "الكل": "All",
  "جديد": "New",
  "٣ جديد": "3 new",

  // Statuses / risk
  "آمن": "Safe",
  "آمنة": "Safe",
  "آمن جداً": "Very safe",
  "مشتبه به": "Suspicious",
  "محظور": "Blocked",
  "احتيال": "Fraud",
  "احتيال محتمل": "Potential fraud",
  "احتيالي": "Fraudulent",
  "خطر مرتفع": "High Risk",
  "خطر مرتفع جداً": "Very high risk",
  "خطير جداً": "Very dangerous",
  "بحاجة للحذر": "Requires caution",
  "درجة الخطورة": "Risk Score",
  "درجة خطورة ٩٢٪": "Risk score 92%",
  "درجة ٦٢٪": "Score 62%",
  "درجة ثقة النموذج": "Model confidence",
  "ثقة عالية": "High confidence",
  "ممتاز": "Excellent",
  "مهم": "Important",
  "أساسي": "Essential",
  "موصى به": "Recommended",
  "مهارة": "Skill",
  "قيد المراقبة": "Under monitoring",
  "حُظر تلقائياً": "Auto-blocked",
  "حُظر تلقائيًا": "Auto-blocked",
  "تم توثيقها": "Verified",
  "توثيق": "Verification",
  "محفوظ": "Saved",
  "موثوق": "Trusted",
  "جهاز موثوق": "Trusted device",
  "جهاز": "Device",
  "أجهزة": "Devices",
  "أجهزة معروفة": "Known devices",
  "الأجهزة الموثوقة": "Trusted Devices",
  "هذا الجهاز": "This device",
  "من حساب": "From account",
  "من رقم غير معروف يدّعي أنه من بنك الإنماء": "From an unknown number claiming to be Alinma Bank",
  "من رقم غير رسمي.": "From an unofficial number.",
  "رقم مجهول": "Unknown number",
  "الرياض": "Riyadh",
  "الرياض ": "Riyadh",
  "جدة ": "Jeddah",
  "آخر استخدام قبل يومين": "Last used 2 days ago",
  "آخر استخدام قبل ٤ ساعات": "Last used 4 hours ago",
  "الرياض • هذا الجهاز": "Riyadh • This device",

  // Alerts screen
  "مركز التنبيهات": "Alerts Center",
  "التنبيهات ": "Alerts",
  "كل ما رصده ظل من محاولات وأنشطة تخص حسابك.":
    "Everything Zill has detected regarding your account activity.",
  "اليوم": "Today",
  "الأمس": "Yesterday",
  "أمس": "Yesterday",
  "تم إيقاف عملية عالية الخطورة": "A high-risk transaction was stopped",
  "تم اكتشاف رابط احتيالي": "A phishing link was detected",
  "تم اكتشاف مستفيد مشبوه": "A suspicious beneficiary was detected",
  "تم تحليل رسالة جديدة": "A new message was analyzed",
  "تم تحليل رسالة مشبوهة": "A suspicious message was analyzed",
  "تفعيل جهاز موثوق جديد": "A new trusted device was activated",
  "رسالة آمنة تم التحقق منها": "A safe message was verified",
  "تحويل ٥٠٬٠٠٠ ريال إلى مستفيد جديد": "SAR 50,000 transfer to a new beneficiary",
  "تحويل ١٬٢٥٠ ريال لسارة": "SAR 1,250 transfer to Sarah",
  "إشعار رسمي من بنك الإنماء": "Official notice from Alinma Bank",
  "تحويل": "Transfer",
  "مستفيد": "Beneficiary",
  "تصيّد": "Phishing",
  "مرتبط بـ ٣ بلاغات سابقة": "Linked to 3 previous reports",
  "مرتبط بـ ٣ بلاغات سابقة.": "Linked to 3 previous reports.",
  "بلاغات سابقة": "previous reports",
  "تمت الإضافة يدويًا": "Added manually",
  "قبل ساعة": "1 hour ago",
  "قبل ١٢ دقيقة": "12 min ago",
  "قبل ١٥ دقيقة": "15 min ago",
  "قبل ٢٧ دقيقة": "27 min ago",
  "قبل ٣٠ دقيقة": "30 min ago",
  "قبل ٥ دقائق": "5 min ago",
  "قبل ٨ دقائق": "8 min ago",
  "٣ دقائق": "3 min",
  "٤ دقائق": "4 min",
  "٥ دقائق": "5 min",
  "٦ دقائق": "6 min",
  "٤ دقائق قراءة": "4 min read",
  "قبل الضغط عليه": "Before you tap it",
  "من ": "From ",
  "من": "From",
  "إلى": "To",
  "إلى عبدالرحمن ن. ": "To Abdulrahman N. ",
  "٩٦٦ ٥٥٥ ٧٢١ ٤٤٠": "+966 555 721 440",
  "٩٦٦ ٥٥٥ ٧٢١ ٤٤٠ ": "+966 555 721 440",
  "٩٦٦٥٥٠": "+966550",
  "٩٠٠٤ ": "9004 ",

  // Analytics
  "التحليل التفصيلي": "Detailed Analysis",
  "التحويلات المحمية": "Protected Transfers",
  "درجة الأمان الشهرية": "Monthly security score",
  "محاولات الاحتيال": "Fraud attempts",
  "محاولة احتيال": "fraud attempt",
  "منع": "Blocked",
  "تم منع ": "Blocked ",
  "تحسّن ": "improved ",
  "حماية": "Protection",
  "الرسائل": "Messages",
  "الروابط": "Links",
  "المجموع": "Total",
  "تحليل": "Analysis",
  "تقارير الحماية": "Protection Reports",
  "أفضل إنجاز هذا الشهر": "Best achievement this month",
  "ملخص هذا الشهر": "This month's summary",
  "نظرة تحليلية على أداء ظل في حماية حسابك.":
    "An analytical view of Zill's performance in protecting your account.",
  "عمليات آمنة": "Safe transactions",
  "وحماية عمليات بقيمة تقديرية": "protecting transactions worth an estimated",
  "ريال.": "SAR.",
  "ريال": "SAR",
  "آخر ٦ أشهر": "Last 6 months",
  "آخر ٩٠ يومًا": "Last 90 days",
  "يناير": "Jan",
  "فبراير": "Feb",
  "مارس": "Mar",
  "أبريل": "Apr",
  "مايو": "May",
  "يونيو": "Jun",
  "يونيو ٢٠٢٦": "June 2026",
  "٧٪ عن مايو": "7% vs May",
  "١٢٢": "122",
  "١٤": "14",
  "١٨٪": "18%",
  "٣٤٧": "347",
  "٤٦٩": "469",
  "٤٪": "4%",
  "٧٣٬٠٠٠ ": "73,000 ",
  "٩٦": "96",
  "٩٪": "9%",
  "٢١": "21",
  "١٢": "12",

  // Message analysis
  "تحليل الرسائل": "Message Analysis",
  "تحليل الرسائل ": "Message Analysis",
  "لماذا اعتبرها ظل خطيرة؟": "Why did Zill flag it as dangerous?",
  "الكلمات التي اكتشفها الذكاء الاصطناعي": "Words detected by the AI",
  "تجمع الرسالة بين خمس علامات احتيال معروفة في وقت واحد":
    "The message combines five known fraud signals at once",
  "أسلوب الاستعجال والتهديد": "Urgency and threat tactics",
  "أسلوب استعجال": "Urgency tactic",
  "انتحال جهة رسمية": "Official-body impersonation",
  "انتحال جهة رسمية، طلب رمز تحقق، أسلوب استعجال،":
    "Official impersonation, OTP request, urgency,",
  "انتحال صفة موظف بنك": "Impersonating a bank employee",
  "التصيّد بالرسائل": "SMS phishing",
  "لخلق الذعر.": "to create panic.",
  "تدّعي الرسالة صدورها من ": "The message claims to be from ",
  "تستخدم كلمات مثل ": "It uses words such as ",
  "تُلمّح إلى تحويل مبلغ لإلغاء عملية وهمية.": "It hints at transferring money to cancel a fake transaction.",
  "هذه العبارات ترتبط بأنماط الهندسة الاجتماعية والتصيّد الاحتيالي التي رصدها ظل في آلاف الحالات السابقة.":
    "These phrases match social-engineering and phishing patterns Zill has observed in thousands of prior cases.",
  "مصدر الرسالة الاحتيالية.": "Source of the fraudulent message.",
  "أو الصق نص الرسالة": "or paste the message text",
  "ارفع صورة الرسالة وسيقوم ظل بتحليلها فورًا.": "Upload the message screenshot and Zill will analyze it immediately.",
  "أو اضغط لالتقاط الرسالة من الاستوديو": "or tap to pick the message from your gallery",
  "اسحب لقطة الشاشة هنا": "Drop the screenshot here",
  "قراءة بصرية": "Optical reading",
  "تحليل باستخدام الذكاء الاصطناعي": "AI-powered analysis",
  "تحليل متعدد الطبقات لمحتوى الرسالة والرابط": "Multi-layer analysis of message and link content",
  "أقل من ثانية.": "in less than a second.",
  "لا تشارك رمز التحقق (": "Never share the OTP (",
  "مع أي شخص، حتى لو ادّعى أنه من البنك.": "with anyone, even someone claiming to be from the bank.",
  "لا يطلب البنك أبدًا رمز ": "The bank never asks for the ",
  "تواصل مع بنك الإنماء عبر الرقم ٨٠٠١٢٤٢٤٢٤ للتحقق.":
    "Contact Alinma Bank at 800-124-2424 to verify.",

  // Link check
  "تحليل الرابط": "Link Analysis",
  "أدخل الرابط وسيفحص ظل سمعته وسلامته خلال ثوانٍ.":
    "Enter the link and Zill will check its reputation and safety within seconds.",
  "رابط للفحص": "Link to scan",
  "رابط احتيالي": "Phishing link",
  "رابط بنطاق حديث، ودعوة لتحويل مبلغ. هذا النمط يطابق ٩٤٪ من عمليات ":
    "A link with a fresh domain and a payment request. This pattern matches 94% of ",
  "رابط مشبوه": "Suspicious link",
  "لا تضغط الرابط. تم حظره تلقائيًا داخل التطبيق.":
    "Do not tap the link. It has been auto-blocked inside the app.",
  "لا يوجد سجل موثوق": "No trusted history",
  "الرابط قيد الفحص": "Link being scanned",
  "الإبلاغ عن الرابط": "Report the link",
  "تفاصيل الفحص": "Scan details",
  "سمعة الموقع": "Site reputation",
  "شهادة ": "Certificate ",
  "النطاق ": "Domain ",
  "تشابه اسم النطاق": "Domain name similarity",
  "نطاق عمره ٣ أيام يحاكي اسم البنك": "3-day-old domain mimicking the bank name",
  "هذا الرابط تم إنشاؤه قبل ٣ أيام فقط، يستخدم اسمًا مشابهًا لبنك الإنماء، ولم يُسجَّل باسم أي جهة رسمية.":
    "This link was created just 3 days ago, uses a name similar to Alinma Bank, and is not registered to any official body.",
  "تم الإبلاغ عنه من ١٤ عميلًا مختلفًا خلال آخر ٤٨ ساعة. لا تفتحه ولا تُدخل أي بيانات فيه.":
    "It was reported by 14 different customers in the last 48 hours. Do not open it or enter any data into it.",
  "١٤ بلاغ خلال آخر ٤٨ ساعة": "14 reports in the last 48 hours",
  "٣ أيام فقط": "Only 3 days",
  "يفحص ظل النطاق، الشهادة، والسمعة عبر ٣٢ مصدرًا":
    "Zill checks the domain, certificate and reputation across 32 sources",

  // Twin
  "توأمك المالي الرقمي": "Your digital financial twin",
  "نموذج ذكي يمثّل سلوكك المصرفي المعتاد، ويكتشف أي عملية خارجة عن نمطك.":
    "A smart model of your usual banking behavior that detects any transaction outside your pattern.",
  "سلوكك المعتاد": "Your normal behavior",
  "سلوكك الطبيعي": "Your normal behavior",
  "سلوكك المصرفي": "Your banking behavior",
  "السلوك المعتاد": "Usual behavior",
  "العملية الحالية": "Current transaction",
  "خارج نمطك المعتاد": "Outside your usual pattern",
  "خارج نمطك المصرفي بشكل كبير": "Significantly outside your banking pattern",
  "خارج النمط": "Off pattern",
  "خارج نمط استخدامك.": "outside your usage pattern.",
  "النمط المالي": "Financial pattern",
  "مقارنة سلوكية مباشرة": "Live behavioral comparison",
  "مقارنة مع سلوكك المعتاد": "Compared to your usual behavior",
  "مقارنة مع متوسط تحويلاتك": "Compared to your transfer average",
  "مقارنة مع أنماط الاحتيال": "Compared to fraud patterns",
  "مقارنة الإحداثيات مع مواقعك المعتادة": "Comparing coordinates with your usual locations",
  "متوسط التحويل": "Transfer average",
  "متوسطك الشهري.": "your monthly average.",
  "متوسطك).": "your average).",
  "بنسبة ٨٧٪": "by 87%",
  "٢١ ضعف متوسط تحويلاتك الشهرية.": "21x your monthly transfer average.",
  "مبلغ أعلى من المعتاد": "Higher amount than usual",
  "مبلغ مرتفع ": "Large amount ",
  "لم تُنفّذ من قبل أي عملية بين ١ - ٥ فجرًا.": "You have never made a transaction between 1–5 AM.",
  "لم يسبق التحويل إلى هذا الحساب من قبل.": "You have never transferred to this account before.",
  "أول ظهور قبل ١٢ دقيقة.": "First seen 12 minutes ago.",
  "أول ظهور لهذا الجهاز في تاريخ الحساب.": "First appearance of this device in the account history.",
  "أُضيف قبل ٤ دقائق.": "Added 4 minutes ago.",
  "تجاوزت ٤ عوامل الحد الآمن في وقت واحد.": "4 factors exceeded the safe threshold at once.",
  "مدينة مختلفة عن مواقع المعاملات الاعتيادية.": "A different city from your usual transaction locations.",
  "الوقت المعتاد": "Usual time",
  "الوقت": "Time",
  "وقت غير معتاد": "Unusual time",
  "وقت غير معتاد ": "Unusual time",
  "وقت الفجر ": "Dawn time ",
  "٤٣ فجراً": "4:43 AM",
  "٤٣ فجرًا.": "4:43 AM.",
  "٤١ ص": "4:41 AM",
  "٦ مساءً": "6 PM",
  "مساءً": "PM",
  "الموقع": "Location",
  "مسار جديد": "New path",
  "جهاز جديد": "New device",
  "جهاز جديد غير موثوق": "New untrusted device",
  "جهاز جديد لم يُستخدم مع الحساب من قبل.": "A new device never used with the account before.",
  "جهاز جديد لم يُستخدم من قبل.": "New device, never used before.",
  "جهاز غير معروف (": "Unknown device (",
  "مستفيد جديد": "New beneficiary",
  "مستفيد جديد ": "New beneficiary",
  "مستفيد جديد قيد المراقبة": "New beneficiary under monitoring",
  "مستفيد جديد لم يسبق التحويل له.": "A new beneficiary you've never transferred to.",
  "من جهاز جديد إلى مستفيد جديد": "From a new device to a new beneficiary",
  "مطابقة مع توأمك المالي": "Match with your financial twin",
  "نتيجة المقارنة": "Comparison result",

  // Transfer & explainable
  "المبلغ": "Amount",
  "المبلغ (ريال سعودي)": "Amount (SAR)",
  "المستفيد": "Beneficiary",
  "اسم المستفيد": "Beneficiary name",
  "سبب التحويل": "Transfer reason",
  "مساعدة عائلية": "Family support",
  "رسوم": "Fees",
  "مجاناً": "Free",
  "الحساب الرئيسي ": "Main account ",
  "رقم الآيبان (": "IBAN (",
  "تحويل بنكي": "Bank transfer",
  "تحويل بنكي جديد": "New bank transfer",
  "تحويل جاري": "Transfer in progress",
  "جاري ": "In progress ",
  "جاري تحليل العملية": "Analyzing transaction",
  "جارٍ تحليل العملية": "Analyzing transaction",
  "جاري التحليل بالذكاء الاصطناعي": "AI analysis in progress",
  "جاري التحقق": "Verifying",
  "جاري المقارنة مع توأمك": "Comparing with your twin",
  "جاري إعادتك إلى الصفحة الرئيسية": "Returning you to Home",
  "تحليل العملية": "Transaction Analysis",
  "تحليل العملية ": "Transaction Analysis",
  "تحليل مخاطر التحويل": "Transfer risk analysis",
  "تحليل ٥ عوامل خلال ٠٫٤ ثانية": "5 factors analyzed in 0.4 seconds",
  "يفحص ظل ٥ عوامل خطر قبل إتمام التحويل.": "Zill checks 5 risk factors before completing the transfer.",
  "يقارن ظل هذه العملية بـ ١١٤ عملية سابقة": "Zill compares this to 114 past transactions",
  "يقرأ ظل الرسالة ويقارنها بأنماط الاحتيال":
    "Zill reads the message and matches it against fraud patterns",
  "يحلل الجهاز، الموقع، المبلغ، والوقت.": "Analyzes device, location, amount and time.",
  "يحاكي ": "Simulates ",
  "يتعلّم منك": "Learns from you",
  "ملخص العملية": "Transaction summary",
  "ملخص ذكي": "Smart summary",
  "مراجعة ذكية": "Smart review",
  "لن يتم إرسال المبلغ قبل اكتمال تحليل ظل للعملية.":
    "The amount will not be sent before Zill completes its analysis.",
  "لن يتم إرسال المبلغ قبل التحقق": "The amount will not be sent before verification",
  "سيتم مراجعة العملية بواسطة ظل قبل التنفيذ.": "Zill will review the transaction before execution.",
  "سيتم إيقاف الحساب": "The account will be suspended",
  "سيتم إيقاف حسابك": "Your account will be suspended",
  "سيصل إلى جوالك ٥٥٠ ": "You'll receive on your mobile ",
  "الذي سيصلك.": "that will be sent to you.",
  "التحقق وإكمال المراجعة": "Verify and complete the review",
  "التحقق وإكمال": "Verify and complete",
  "التحقق الآن": "Verify Now",
  "التحقق": "Verify",
  "التحقق ": "Verify",
  "التحقق البيومتري": "Biometric Verification",
  "التحقق من الهوية": "Identity Verification",
  "تحقق من بصمة الجهاز والنظام": "Verifies the device and system fingerprint",
  "تأكيد أنك أنت": "Confirm it's really you",
  "بانتظار التحقق البيومتري من المستخدم": "Awaiting user biometric verification",
  "متابعة إلى التحليل": "Continue to Analysis",
  "التالي": "Next",
  "إلغاء العملية": "Cancel transaction",
  "إلغاء والعودة": "Cancel and return",
  "إيقاف العملية مؤقتاً": "Pause the transaction",
  "إيقاف العملية مؤقتًا حتى يتم التحقق من هويتك.":
    "Pause the transaction until your identity is verified.",
  "إيقاف مؤقت": "Paused",
  "ينصح ظل بإيقاف العملية": "Zill recommends stopping the transaction",
  "تم تجميد التحويل": "Transfer frozen",
  "تم منع محاولة احتيال محتملة": "A potential fraud attempt was prevented",
  "وحماية أموالك بنجاح": "and your money was protected successfully",
  "تم منع محاولة احتيال محتملة وحماية أموالك بنجاح":
    "A potential fraud attempt was prevented and your money was protected successfully",
  "تم التحقق بنجاح": "Verified successfully",
  "تم الرفع": "Uploaded",
  "تم الضغط عليه من نفس الجهاز.": "Tapped from the same device.",
  "أدخل الرمز المرسل إلى جوالك": "Enter the code sent to your mobile",
  "أدخل رمز التحقق": "Enter the verification code",
  "رمز تحقق (": "OTP (",
  "وأدخل رمز ": "and enter code ",
  "اختر طريقة التحقق للاستمرار في مراجعة العملية.":
    "Choose a verification method to continue reviewing the transaction.",
  "حظر ومتابعة": "Block and continue",
  "حفظ في التنبيهات": "Save to alerts",
  "فحص رسالة": "Scan message",
  "فحص رسالة أخرى": "Scan another message",
  "لفحص الرسالة داخل ظل": "to scan the message inside Zill",
  "اضغط هنا": "Tap here",
  "إرسال": "Send",
  "اكتب سؤالك لمساعد ظل": "Ask the Zill assistant",
  "كيف أستطيع مساعدتك اليوم؟": "How can I help you today?",
  "كيف أحمي نفسي؟": "How do I protect myself?",
  "هل هذه عملية احتيال؟": "Is this a fraud attempt?",
  "مساعد ظل": "Zill Assistant",
  "متصل ": "Online ",
  "يجيب فوراً": "Replies instantly",

  // Explainable AI
  "الذكاء الاصطناعي القابل للتفسير ": "Explainable AI",
  "الذكاء الاصطناعي القابل للتفسير": "Explainable AI",
  "كيف اتخذ ظل قراره؟": "How did Zill make its decision?",
  "التسلسل الزمني للقرار": "Decision timeline",
  "القرار النهائي": "Final decision",
  "قرار الذكاء الاصطناعي": "AI decision",
  "قرار ظل": "Zill's decision",
  "التوصية": "Recommendation",
  "شفافية كاملة": "Full transparency",
  "تفاصيل العنصر المحدد": "Details of the selected item",
  "كل عامل ووزنه في القرار النهائي.": "Each factor and its weight in the final decision.",
  "أسباب الاشتباه": "Reasons for suspicion",
  "نتيجة التحليل": "Analysis result",

  // Awareness / education
  "أساسيات الحماية المالية": "Financial Protection Basics",
  "أحدث طرق الاحتيال في ٢٠٢٦": "Latest fraud methods in 2026",
  "الأنماط الجديدة التي رصدها ظل خلال الأسابيع الأخيرة.":
    "New patterns Zill has detected in recent weeks.",
  "الأرقام الرسمية، القنوات المعتمدة، وما لا يفعله البنك أبدًا.":
    "Official numbers, authorized channels, and what the bank never does.",
  "بطاقات التوعية": "Awareness cards",
  "٢ من ٥ دروس مكتملة": "2 of 5 lessons completed",
  "٥ دروس قصيرة ": "5 short lessons ",
  "٥ إشارات احتيال في رسالة واحدة": "5 fraud signals in one message",
  "٦ علامات لا تخطئ للتفريق بين رسالة رسمية وأخرى احتيالية.":
    "6 unmistakable signs to distinguish a real message from a fraudulent one.",
  "التي أوقفها ظل": "that Zill has stopped",
  "أكمل المسار واحصل على شارة الأمان الذهبية.": "Complete the path and earn the golden safety badge.",
  "كيف تتأكد من صحة الروابط؟": "How do you verify links?",
  "كيف تحمي رمز ": "How to protect your ",
  "كيف تعرف موظف البنك الحقيقي؟": "How to recognize a real bank employee?",
  "كيف تكتشف رسائل التصيّد؟": "How to spot phishing messages?",
  "طرق بسيطة لفحص أي رابط قبل الضغط ع": "Simple ways to check any link before tapping it",
  "لماذا لا يجب مشاركته مطلقًا حتى مع من يدّعي أنه من البنك؟":
    "Why you must never share it, even with someone claiming to be from the bank?",
  "لماذا؟": "Why?",
  "محتوى قصير وعملي من فريق أمن بنك الإنماء.":
    "Short, actionable content from the Alinma Bank security team.",
  "خلال الأشهر الثلاثة الماضية.": "over the last three months.",

  // Network
  "شبكة ظل": "Zill Network",
  "شبكة ظل ": "Zill Network",
  "خريطة العلاقات المشبوهة": "Suspicious relations map",
  "يربط ظل بين الأرقام والأجهزة والحسابات لكشف الاحتيال بشكل جماعي.":
    "Zill links numbers, devices and accounts to detect fraud collectively.",
  "اكتشف ظل هذا العنصر ضمن ٧ حالات احتيال مشابهة خلال آخر ٤٨ ساعة عبر شبكة عملاء بنك الإنماء.":
    "Zill spotted this item across 7 similar fraud cases in the last 48 hours across Alinma customers.",
  "فحص السجل التاريخي مع هذا الحساب": "Historical record check with this account",

  // Settings misc
  "إعدادات الحماية": "Security Settings",
  "روابط سريعة": "Quick Links",
  "ذكاء ظل الاستباقي": "Proactive Zill AI",
  "اكتشاف تلقائي للأنماط الغريبة": "Automatic detection of unusual patterns",
  "الإشعارات الفورية": "Instant notifications",
  "تنبيهات كل عملية مشبوهة": "Alerts for every suspicious transaction",
  "مشاركة تحسين النموذج": "Model-improvement sharing",
  "بيانات مجهولة الهوية فقط": "Anonymized data only",
  "حماية ظل مفعّلة": "Zill protection active",

  // Demo mode
  "الخطوة ": "Step ",
  "الجهاز": "Device",
  "١. وصول رسالة احتيالية": "1. A fraudulent message arrives",
  "٢. المستخدم يرفع ": "2. User uploads ",
  "٣. الذكاء الاصطناعي يحلّل": "3. AI analyzes",
  "٤. اكتشاف انتحال بنك": "4. Bank impersonation detected",
  "٥. المستخدم يفحص الرابط": "5. User checks the link",
  "٦. رابط تصيّد": "6. Phishing link",
  "٧. محاولة تحويل ٥٠٬٠٠٠ ريال": "7. Attempt to transfer SAR 50,000",
  "٨. التوأم المالي يحلل": "8. Financial Twin analyzing",
  "٩. درجة خطورة ٩٧٪": "9. Risk score 97%",
  "١٠. إيقاف العملية مؤقتًا": "10. Transaction paused",
  "١١. شرح القرار للمستخدم": "11. Decision explained to user",
  "١٢. حماية أموالك بنجاح": "12. Your money is safely protected",
  "تشغيل المحاكاة ": "Run simulation ",
  "إعادة": "Restart",
  "الطريقة الأسرع ": "Fastest method ",
  "فوراً": "Instantly",
  "فورًا": "Instantly",
  "في الانتظار": "Pending",
  "تنبيه فوري داخل التطبيق لك.": "Instant in-app notification for you.",
  "تحديث بياناتك": "Update your info",
  "هذه العملية تختلف عن سلوكك المعتاد.": "This transaction differs from your usual behavior.",
  "٥٠٬٠٠٠ ": "50,000 ",
  "٥٠٬٠٠٠ ر.س": "SAR 50,000",
  "٥٠٬٠٠٠ ريال ": "SAR 50,000 ",
  "٥٠٬٠٠٠ ريال (٢١": "SAR 50,000 (21",
  "٢٬٣٠٠": "2,300",
  "٢٬٣٠٠ ر.س": "SAR 2,300",
  "١٫٢ ميجابايت ": "1.2 MB ",
  "حتى ١٠ ميجا": "up to 10 MB",
  "مجانية، منذ يومين)": "free, 2 days ago)",
  "مثال آمن": "Safe example",
  "مثال احتيالي": "Fraud example",
  "سلبية ": "Negative ",

  // Verify screen
  "صباح الخير 👋": "Good morning 👋",
  "اليوم: منع ظل محاولتَي احتيال، وحلّل ٣ رسائل ورابطًا واحدًا.": "Today: Zill blocked 2 fraud attempts and analyzed 3 messages and 1 link.",
  "رسالة • رابط • تحويل": "Message • Link • Transfer",
  "2FA مفعّل": "2FA enabled",
  "مستوى الحماية آخر ٧ أيام": "Protection level — last 7 days",
  "+٤٪": "+4%",
  "🎬 تشغيل المحاكاة": "🎬 Run Simulation",
  "بصمة + Face ID": "Fingerprint + Face ID",
  "عميل بنك الإنماء منذ ٢٠١٩": "Alinma customer since 2019",
  "جدة • آخر استخدام قبل يومين": "Jeddah • Last used 2 days ago",
  "الرياض • آخر استخدام قبل ٤ ساعات": "Riyadh • Last used 4 hours ago",
  "الإصدار ٤٫١٢٫٠ • بنك الإنماء ٢٠٢٦": "Version 4.12.0 • Alinma Bank 2026",
  "ظل • الإصدار ٤٫١٢٫٠ • بنك الإنماء ٢٠٢٦": "Zill • Version 4.12.0 • Alinma Bank 2026",
  "ظِـل": "Zill",
  "٦": "6",
  "٣": "3",
  "+٦": "+6",
  "+٩٪": "+9%",
  "+١٨٪": "+18%",
  "+12٪": "+12%",
  "+13٪": "+13%",
  "+20٪": "+20%",
  "+22٪": "+22%",
  "+30٪": "+30%",
  "من:": "From:",
  "إلى:": "To:",
  "الوقت:": "Time:",
  "الجهاز:": "Device:",
  "الموقع:": "Location:",
  "المبلغ:": "Amount:",
  "المستفيد:": "Beneficiary:",
  "المجموع:": "Total:",
  "٢:٤١ ص": "2:41 AM",
  "٢:٤٣ فجراً": "2:43 AM",
  "٢:٤٣ فجرًا": "2:43 AM",
  "٧٣٬٠٠٠": "73,000",
  "٥٠٬٠٠٠": "50,000",
  "طلب OTP": "OTP request",
  "طلب تحويل": "Transfer request",
  "طلب تحويل مالي": "Money transfer request",
  "طلب رمز التحقق (OTP)": "OTP verification request",
  "IBAN جديد": "New IBAN",
  "رقم الآيبان (IBAN)": "IBAN number",
  "تحليل رابط": "Link analysis",
  "عمر النطاق": "Domain age",
  "شهادة SSL": "SSL certificate",
  "الحساب — ظل": "Account — Zill",
  "فحص الروابط": "Link check",
  "التحقق — ظل": "Verify — Zill",
  "ظل • محاكاة": "Zill • Simulation",
  "عبدالرحمن ن.": "Abdulrahman N.",
  "شبكة ظل — ظل": "Zill Network — Zill",
  "جاري التحقق…": "Verifying…",
  "التقارير — ظل": "Reports — Zill",
  "الرئيسية — ظل": "Home — Zill",
  "آخر التنبيهات": "Latest alerts",
  "عوامل التحليل": "Analysis factors",
  "بدء تحويل — ظل": "Start Transfer — Zill",
  "التنبيهات — ظل": "Alerts — Zill",
  "عدد المستفيدين": "Beneficiaries count",
  "رمز تحقق (OTP)": "OTP code",
  "ظل يحميك دائمًا": "Zill always protects you",
  "جاري • ٩٠٠٤ ****": "Current • 9004 ****",
  "فحص الروابط — ظل": "Link Check — Zill",
  "ظل — بنك الإنماء": "Zill — Alinma Bank",
  "+٩٦٦ ٥٥٥ ٧٢١ ٤٤٠": "+966 555 721 440",
  "متصل — يجيب فوراً": "Online — replies instantly",
  "Android غير معروف": "Unknown Android",
  "كيف تحمي رمز OTP؟": "How to protect your OTP?",
  "مركز التوعية — ظل": "Awareness Center — Zill",
  "ظل — تسجيل الدخول": "Zill — Sign in",
  "التوأم المالي — ظل": "Financial Twin — Zill",
  "تحليل العملية — ظل": "Transaction Analysis — Zill",
  "تحليل الرسائل — ظل": "Message Analysis — Zill",
  "قرار ظل: إيقاف مؤقت": "Zill decision: Temporary hold",
  "جارٍ تحليل العملية…": "Analyzing transaction…",
  "تشغيل المحاكاة — ظل": "Run Simulation — Zill",
  "اكتب سؤالك لمساعد ظل…": "Ask Zill Assistant…",
  "١٫٢ ميجابايت — تم الرفع": "1.2 MB — uploaded",
  "عملية جديدة قيد التحليل": "New transaction under analysis",
  "سيصل إلى جوالك ٥٥٠ ****": "Will be sent to your phone 550 ****",
  "جاري المقارنة مع توأمك…": "Comparing with your twin…",
  "جاري تجهيز طبقة الحماية…": "Preparing protection layer…",
  "سلبية — لا يوجد سجل موثوق": "Negative — no trusted record",
  "مستفيد جديد — عبدالرحمن ن.": "New beneficiary — Abdulrahman N.",
  "يحاكي alinma.com بنسبة ٨٧٪": "Mimics alinma.com by 87%",
  "جهاز غير معروف (Android 14)": "Unknown device (Android 14)",
  "٢. المستخدم يرفع Screenshot": "2. User uploads a screenshot",
  "وقت غير معتاد — ٢:٤٣ فجرًا.": "Unusual time — 2:43 AM.",
  "IBAN مرتبط بـ ٣ بلاغات سابقة": "IBAN linked to 3 prior reports",
  "Explainable AI — شفافية كاملة": "Explainable AI — full transparency",
  "ظل — حماية بنك الإنماء الذكية": "Zill — Alinma smart protection",
  "إلى عبدالرحمن ن. — ٢:٤٣ فجراً": "To Abdulrahman N. — 2:43 AM",
  "تحويل ١٬٢٥٠ ريال لسارة • آمنة": "1,250 SAR transfer to Sara • Safe",
  "وقت الفجر — خارج نمط استخدامك.": "Dawn time — outside your usual pattern.",
  "الطريقة الأسرع — أقل من ثانية.": "Fastest method — under a second.",
  "الحساب الرئيسي — محمد عبدالله.": "Primary account — Mohammed Abdullah.",
  "رسالة من +٩٦٦٥٥٠… • قبل ٨ دقائق": "Message from +966550… • 8 minutes ago",
  "مستفيد جديد — أُضيف قبل ٤ دقائق.": "New beneficiary — added 4 minutes ago.",
  "٥٠٬٠٠٠ ريال — ٢١× متوسطك الشهري.": "50,000 SAR — 21× your monthly average.",
  "جاري إعادتك إلى الصفحة الرئيسية…": "Redirecting you to home…",
  "Let’s Encrypt (مجانية، منذ يومين)": "Let's Encrypt (free, 2 days ago)",
  "عبدالرحمن ن. — أُضيف قبل ٤ دقائق.": "Abdulrahman N. — added 4 minutes ago.",
  "alinma-verify.xyz • حُظر تلقائيًا": "alinma-verify.xyz • auto-blocked",
  "alinma-verify.xyz • حُظر تلقائياً": "alinma-verify.xyz • auto-blocked",
  "iPhone 15 Pro — تمت الإضافة يدويًا": "iPhone 15 Pro — added manually",
  "الذكاء الاصطناعي القابل للتفسير — ظل": "Explainable AI — Zill",
  "من +٩٦٦ ٥٥٥ ٧٢١ ٤٤٠ — درجة خطورة ٩٢٪": "From +966 555 721 440 — risk score 92%",
  "طرق بسيطة لفحص أي رابط قبل الضغط عليه.": "Simple ways to inspect any link before tapping.",
  "مبلغ مرتفع — ٥٠٬٠٠٠ ريال (٢١× متوسطك).": "High amount — 50,000 SAR (21× your average).",
  "قراءة بصرية + مقارنة مع أنماط الاحتيال": "Visual reading + comparison to fraud patterns",
  "يقارن ظل هذه العملية بـ ١١٤ عملية سابقة…": "Zill compares this transaction to 114 past ones…",
  "Samsung SM-A546 • أول ظهور قبل ١٢ دقيقة.": "Samsung SM-A546 • first seen 12 minutes ago.",
  "إشعار رسمي من بنك الإنماء — تم توثيقها ✓": "Official Alinma Bank notice — verified ✓",
  "يقرأ ظل الرسالة ويقارنها بأنماط الاحتيال…": "Zill reads the message and compares it to fraud patterns…",
  "+٩٦٦ ٥٥٥ ٧٢١ ٤٤٠ — مصدر الرسالة الاحتيالية.": "+966 555 721 440 — source of the fraudulent message.",
  "شفافية كاملة: كل عامل ووزنه في القرار النهائي.": "Full transparency: every factor and its weight in the final decision.",
  "يفحص ظل النطاق، الشهادة، والسمعة عبر ٣٢ مصدرًا…": "Zill checks the domain, certificate, and reputation across 32 sources…",
  "alinma-verify.xyz — تم الضغط عليه من نفس الجهاز.": "alinma-verify.xyz — clicked from the same device.",
  "SA00 8000 0304 ****  4127 — مرتبط بـ ٣ بلاغات سابقة.": "SA00 8000 0304 ****  4127 — linked to 3 prior reports.",
  "لا يطلب البنك أبدًا رمز OTP عبر الرسائل أو المكالمات.": "The bank never asks for OTP via messages or calls.",
  "تدّعي الرسالة صدورها من ‘بنك الإنماء’ من رقم غير رسمي.": "The message claims to be from 'Alinma Bank' from an unofficial number.",
  "ظل: رفيقك الذكي للحماية المالية داخل تطبيق بنك الإنماء.": "Zill: your smart companion for financial protection inside Alinma Bank.",
  "تستخدم كلمات مثل ‘فورًا’ و‘سيتم إيقاف حسابك’ لخلق الذعر.": "Uses words like 'immediately' and 'your account will be blocked' to create panic.",
  "٥ دروس قصيرة — أكمل المسار واحصل على شارة الأمان الذهبية.": "5 short lessons — complete the path and earn the gold safety badge.",
  "مطلوب تحقق ثنائي من المستخدم قبل إتمام أي تحويل من هذا الجهاز.": "Two-factor verification required before any transfer from this device.",
  "النطاق alinma-verify.xyz غير مسجّل لبنك الإنماء وعمره ٣ أيام فقط.": "Domain alinma-verify.xyz is not registered to Alinma Bank and is only 3 days old.",
  "ظل: طبقة الحماية الذكية داخل تطبيق بنك الإنماء، توقف الاحتيال قبل حدوثه.": "Zill: the intelligent protection layer inside Alinma Bank that stops fraud before it happens.",
  "عزيزي عميل بنك الإنماء، تم تسجيل عملية غير مصرح بها. لإلغائها فورًا: https://alinma-verify.xyz/secure وأدخل رمز OTP الذي سيصلك.": "Dear Alinma customer, an unauthorized transaction was recorded. To cancel immediately: https://alinma-verify.xyz/secure and enter the OTP you will receive.",
  "عزيزي عميل بنك الإنماء، تم تسجيل عملية غير مصرح بها على حسابك. لإلغائها فورًا اضغط الرابط وأدخل رمز التحقق الذي سيصلك: https://alinma-verify.xyz/secure": "Dear Alinma customer, an unauthorized transaction was recorded on your account. To cancel immediately, tap the link and enter the verification code you will receive: https://alinma-verify.xyz/secure",
  "تم منع": "Blocked",
  "محاولة احتيال وحماية عمليات بقيمة تقديرية": "fraud attempts and protected transactions worth approximately",
  "تحسّن +٧٪ عن مايو": "Improved +7% vs May",
};

// ---------------- Context ----------------

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (s: string) => string };
const LangContext = createContext<Ctx>({ lang: "ar", setLang: () => {}, t: (s) => s });

export function useLang() {
  return useContext(LangContext);
}

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "ar";
  const v = localStorage.getItem(KEY);
  return v === "en" ? "en" : "ar";
}

function applyDir(lang: Lang) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";
  html.dataset.lang = lang;
}

/**
 * Walk the DOM and translate every text node / relevant attribute using the
 * AR→EN dictionary. Originals are cached in a WeakMap so switching back to
 * Arabic restores the source strings exactly.
 */
const originals = new WeakMap<Node, string>();
const attrOriginals = new WeakMap<Element, Map<string, string>>();
const ATTRS = ["placeholder", "aria-label", "title", "alt", "value"];

function translateText(text: string): string | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  const hit = DICT[trimmed];
  if (!hit) return null;
  // Preserve surrounding whitespace
  const leading = text.match(/^\s*/)?.[0] ?? "";
  const trailing = text.match(/\s*$/)?.[0] ?? "";
  return leading + hit + trailing;
}

function processNode(node: Node, toEn: boolean) {
  if (node.nodeType === Node.TEXT_NODE) {
    const t = node as Text;
    if (toEn) {
      if (!originals.has(t) && t.nodeValue) {
        const translated = translateText(t.nodeValue);
        if (translated !== null) {
          originals.set(t, t.nodeValue);
          t.nodeValue = translated;
        }
      }
    } else {
      const orig = originals.get(t);
      if (orig !== undefined) {
        t.nodeValue = orig;
        originals.delete(t);
      }
    }
    return;
  }
  if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as Element;
    // Attributes
    if (toEn) {
      let map = attrOriginals.get(el);
      for (const a of ATTRS) {
        const val = el.getAttribute(a);
        if (val) {
          const translated = translateText(val);
          if (translated !== null) {
            if (!map) {
              map = new Map();
              attrOriginals.set(el, map);
            }
            if (!map.has(a)) map.set(a, val);
            el.setAttribute(a, translated);
          }
        }
      }
    } else {
      const map = attrOriginals.get(el);
      if (map) {
        for (const [a, v] of map) el.setAttribute(a, v);
        attrOriginals.delete(el);
      }
    }
    // Children
    for (const child of Array.from(node.childNodes)) processNode(child, toEn);
  }
}

function retranslateAll(lang: Lang) {
  if (typeof document === "undefined") return;
  processNode(document.body, lang === "en");
}

let observer: MutationObserver | null = null;
function startObserver(lang: Lang) {
  if (typeof document === "undefined") return;
  if (observer) observer.disconnect();
  observer = new MutationObserver((mutations) => {
    if (document.documentElement.dataset.lang !== "en") return;
    for (const m of mutations) {
      if (m.type === "characterData" && m.target) {
        processNode(m.target, true);
      } else if (m.type === "childList") {
        m.addedNodes.forEach((n) => processNode(n, true));
      } else if (m.type === "attributes" && m.target.nodeType === 1) {
        processNode(m.target, true);
      }
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ATTRS,
  });
  void lang;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const initial = getInitialLang();
    setLangState(initial);
  }, []);

  useEffect(() => {
    applyDir(lang);
    try {
      localStorage.setItem(KEY, lang);
    } catch {}
    // Give React a tick to finish painting, then translate + observe
    const id = window.setTimeout(() => {
      retranslateAll(lang);
      startObserver(lang);
    }, 30);
    return () => window.clearTimeout(id);
  }, [lang]);

  const value: Ctx = {
    lang,
    setLang: setLangState,
    t: (s) => (lang === "en" ? DICT[s.trim()] ?? s : s),
  };
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
