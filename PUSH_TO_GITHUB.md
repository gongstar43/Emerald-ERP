# رفع المشروع إلى GitHub

تم تهيئة Git وإنشاء أول commit. لرفع الكود إلى المستودع الذي أنشأته:

## 1. استبدل الرابط بالرابط الحقيقي لمستودعك

افتح المستودع على GitHub ثم انسخ الرابط (مثلًا):
- **HTTPS:** `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`
- **SSH:** `git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git`

## 2. نفّذ الأوامر التالية من مجلد المشروع

```bash
cd /home/admins/Emerla-erp

# ربط المستودع المحلي بالمستودع على GitHub (استبدل الرابط بالرابط الحقيقي)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# رفع الفرع main إلى GitHub
git push -u origin main
```

إذا طُلب منك اسم المستخدم وكلمة المرور:
- **اسم المستخدم:** اسم حسابك على GitHub
- **كلمة المرور:** استخدم **Personal Access Token** وليس كلمة مرور الحساب (من: GitHub → Settings → Developer settings → Personal access tokens)

## 3. (اختياري) تغيير اسم/بريد Git لهذا المشروع

إذا أردت أن تظهر مساهماتك باسمك وبريدك:

```bash
cd /home/admins/Emerla-erp
git config user.name "اسمك"
git config user.email "your-email@example.com"
```

---

بعد تنفيذ `git push -u origin main` سيظهر المشروع على GitHub ويمكن للمطورين استنساخه والمساهمة فيه.
