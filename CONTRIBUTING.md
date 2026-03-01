# المساهمة في Emerald ERP | Contributing to Emerald ERP

نرحب بمساهمات المطورين! هذا الدليل يوضح كيف تساهم في المشروع.

We welcome developer contributions! This guide explains how to contribute.

---

## 🇦🇷 للمطورين (العربية)

### 1) استنساخ المشروع وتشغيله محلياً

```bash
# استنساخ المستودع (أو استنساخ Fork الخاص بك)
git clone https://github.com/gongstar43/Emerald-ERP.git
cd Emerald-ERP

# تثبيت المكتبات
npm install

# تشغيل وضع التطوير (يفتح على http://localhost:5173)
npm run dev
```

**تسجيل الدخول التجريبي:** البريد `admin@local` وكلمة المرور `Admin123!`

### 2) طريقة المساهمة (Fork → Branch → Pull Request)

1. **اعمل Fork** للمستودع من GitHub (زر Fork أعلى الصفحة).
2. **استنسخ الـ Fork** على جهازك:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Emerald-ERP.git
   cd Emerald-ERP
   ```
3. **أضف المستودع الأصلي كـ upstream** (لجلب التحديثات لاحقاً):
   ```bash
   git remote add upstream https://github.com/gongstar43/Emerald-ERP.git
   ```
4. **أنشئ فرعاً جديداً** لكل ميزة أو إصلاح:
   ```bash
   git checkout -b feature/اسم-الميزة
   # أو
   git checkout -b fix/وصف-الإصلاح
   ```
5. **عدّل الكود** ثم احفظ التغييرات:
   ```bash
   git add .
   git commit -m "وصف واضح للتغيير"
   ```
6. **ارفع الفرع** إلى fork الخاص بك:
   ```bash
   git push origin feature/اسم-الميزة
   ```
7. **افتح Pull Request** من صفحة fork على GitHub نحو المستودع الأصلي `gongstar43/Emerald-ERP`.

### 3) تحديث forkك من المستودع الأصلي

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### 4) نصائح

- اكتب رسائل commit واضحة (عربي أو إنجليزي).
- في الـ Pull Request اذكر ماذا تغير ولماذا.
- الترجمة والوثائق مرحب بها (العربية والإنجليزية).

---

## 🇬🇧 For Developers (English)

### 1) Clone and run locally

```bash
git clone https://github.com/gongstar43/Emerald-ERP.git
cd Emerald-ERP
npm install
npm run dev
```

**Demo login:** email `admin@local`, password `Admin123!`

### 2) How to contribute (Fork → Branch → Pull Request)

1. **Fork** the repo on GitHub (Fork button at the top).
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Emerald-ERP.git
   cd Emerald-ERP
   ```
3. **Add upstream** (to pull updates later):
   ```bash
   git remote add upstream https://github.com/gongstar43/Emerald-ERP.git
   ```
4. **Create a branch** for each change:
   ```bash
   git checkout -b feature/short-description
   # or
   git checkout -b fix/short-description
   ```
5. **Make your changes**, then:
   ```bash
   git add .
   git commit -m "Clear description of the change"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/short-description
   ```
7. **Open a Pull Request** from your fork to `gongstar43/Emerald-ERP`.

### 3) Sync your fork with upstream

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### 4) Tips

- Use clear commit messages (Arabic or English).
- In the Pull Request, describe what changed and why.
- Translations and docs (Arabic/English) are welcome.

---

## التقنيات | Tech stack

- **Frontend:** React 18, TypeScript, Vite
- **UI:** Tailwind CSS, Shadcn/ui, Radix
- **Routing:** React Router v7

---

## الأسئلة | Questions

- **Issues:** [GitHub Issues](https://github.com/gongstar43/Emerald-ERP/issues)
- **Discussions:** يمكن فتح نقاش عام في تبويب Discussions في المستودع إن وُجد.

Thank you for contributing! شكراً لمساهمتكم 💎
