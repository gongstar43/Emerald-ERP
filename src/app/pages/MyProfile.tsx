import React, { useState } from 'react';
import { useAuth } from '../../lib/auth';
import { useLanguage } from '../../lib/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  Shield,
  Edit,
  Save,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

export default function MyProfile() {
  const { user, userRole } = useAuth();
  const { locale } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.name || '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    company: user?.user_metadata?.company || '',
    address: user?.user_metadata?.address || '',
  });

  const handleSave = () => {
    // في بيئة الإنتاج، سيتم حفظ البيانات في قاعدة البيانات
    toast.success(locale === 'ar' ? 'تم حفظ البيانات بنجاح' : 'Profile updated successfully');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.user_metadata?.name || '',
      email: user?.email || '',
      phone: user?.user_metadata?.phone || '',
      company: user?.user_metadata?.company || '',
      address: user?.user_metadata?.address || '',
    });
    setIsEditing(false);
  };

  const InfoItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className="flex items-start gap-3 py-3">
      <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value || '-'}</p>
      </div>
    </div>
  );

  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {locale === 'ar' ? 'الملف الشخصي' : 'My Profile'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {locale === 'ar' ? 'إدارة معلوماتك الشخصية' : 'Manage your personal information'}
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'تعديل' : 'Edit'}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'حفظ' : 'Save'}
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              {locale === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-semibold">
              {user?.user_metadata?.name?.[0] || user?.email?.[0]?.toUpperCase()}
            </div>
            <div>
              <CardTitle className="text-2xl">{user?.user_metadata?.name || user?.email?.split('@')[0]}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">
                  <Shield className="h-3 w-3 mr-1" />
                  {userRole || 'user'}
                </Badge>
                <span className="text-sm text-muted-foreground">{user?.email}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Information */}
      <Card>
        <CardHeader>
          <CardTitle>
            {locale === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">
                  {locale === 'ar' ? 'الاسم' : 'Name'}
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={locale === 'ar' ? 'أدخل الاسم' : 'Enter name'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={locale === 'ar' ? 'أدخل البريد الإلكتروني' : 'Enter email'}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  {locale === 'ar' ? 'رقم الهاتف' : 'Phone'}
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={locale === 'ar' ? 'أدخل رقم الهاتف' : 'Enter phone'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">
                  {locale === 'ar' ? 'الشركة' : 'Company'}
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder={locale === 'ar' ? 'أدخل اسم الشركة' : 'Enter company'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  {locale === 'ar' ? 'العنوان' : 'Address'}
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={locale === 'ar' ? 'أدخل العنوان' : 'Enter address'}
                />
              </div>
            </>
          ) : (
            <>
              <InfoItem
                icon={User}
                label={locale === 'ar' ? 'الاسم' : 'Name'}
                value={formData.name}
              />
              <Separator />
              <InfoItem
                icon={Mail}
                label={locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                value={formData.email}
              />
              <Separator />
              <InfoItem
                icon={Phone}
                label={locale === 'ar' ? 'رقم الهاتف' : 'Phone'}
                value={formData.phone}
              />
              <Separator />
              <InfoItem
                icon={Building2}
                label={locale === 'ar' ? 'الشركة' : 'Company'}
                value={formData.company}
              />
              <Separator />
              <InfoItem
                icon={MapPin}
                label={locale === 'ar' ? 'العنوان' : 'Address'}
                value={formData.address}
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>
            {locale === 'ar' ? 'معلومات الحساب' : 'Account Information'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoItem
            icon={Shield}
            label={locale === 'ar' ? 'الدور' : 'Role'}
            value={userRole || 'user'}
          />
          <Separator />
          <InfoItem
            icon={Calendar}
            label={locale === 'ar' ? 'تاريخ التسجيل' : 'Member Since'}
            value={new Date(user?.created_at || Date.now()).toLocaleDateString(
              locale === 'ar' ? 'ar-SA' : 'en-US',
              { year: 'numeric', month: 'long', day: 'numeric' }
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
