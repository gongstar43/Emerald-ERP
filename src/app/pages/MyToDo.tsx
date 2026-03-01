import React, { useState } from 'react';
import { useLanguage } from '../../lib/i18n';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  CheckSquare,
  Plus,
  Trash2,
  MoreVertical,
  Circle,
  CheckCircle2,
  Star,
  Calendar as CalendarIcon,
  ListChecks,
} from 'lucide-react';
import { toast } from 'sonner';

interface ToDoItem {
  id: string;
  text: string;
  completed: boolean;
  important: boolean;
  createdAt: string;
  completedAt?: string;
}

export default function MyToDo() {
  const { locale } = useLanguage();

  const initialTodos: ToDoItem[] = [
    {
      id: '1',
      text: locale === 'ar' ? 'مراجعة التقرير الشهري' : 'Review monthly report',
      completed: false,
      important: true,
      createdAt: '2026-02-27T09:00:00',
    },
    {
      id: '2',
      text: locale === 'ar' ? 'الرد على البريد الإلكتروني' : 'Reply to emails',
      completed: false,
      important: false,
      createdAt: '2026-02-27T10:00:00',
    },
    {
      id: '3',
      text: locale === 'ar' ? 'تحديث جدول المبيعات' : 'Update sales spreadsheet',
      completed: true,
      important: false,
      createdAt: '2026-02-26T14:00:00',
      completedAt: '2026-02-27T11:30:00',
    },
    {
      id: '4',
      text: locale === 'ar' ? 'الاتصال بالعملاء الجدد' : 'Call new clients',
      completed: false,
      important: true,
      createdAt: '2026-02-27T08:00:00',
    },
    {
      id: '5',
      text: locale === 'ar' ? 'إعداد عرض تقديمي' : 'Prepare presentation',
      completed: false,
      important: false,
      createdAt: '2026-02-27T11:00:00',
    },
  ];

  const [todos, setTodos] = useState<ToDoItem[]>(initialTodos);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleAddTodo = () => {
    if (!newTodoText.trim()) {
      toast.error(locale === 'ar' ? 'الرجاء إدخال نص المهمة' : 'Please enter task text');
      return;
    }

    const newTodo: ToDoItem = {
      id: String(todos.length + 1),
      text: newTodoText,
      completed: false,
      important: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([newTodo, ...todos]);
    setNewTodoText('');
    setIsAddDialogOpen(false);
    toast.success(locale === 'ar' ? 'تم إضافة المهمة' : 'Task added');
  };

  const handleToggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date().toISOString() : undefined,
            }
          : todo
      )
    );
  };

  const handleToggleImportant = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, important: !todo.important } : todo)));
    toast.success(locale === 'ar' ? 'تم تحديث المهمة' : 'Task updated');
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success(locale === 'ar' ? 'تم حذف المهمة' : 'Task deleted');
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
    toast.success(locale === 'ar' ? 'تم حذف المهام المكتملة' : 'Completed tasks cleared');
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);
  const importantTodos = todos.filter((t) => t.important && !t.completed);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return locale === 'ar' ? 'اليوم' : 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return locale === 'ar' ? 'أمس' : 'Yesterday';
    } else {
      return new Intl.DateTimeFormat(locale, {
        month: 'short',
        day: '2-digit',
      }).format(date);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ListChecks className="h-8 w-8 text-blue-600" />
            {locale === 'ar' ? 'قائمة المهام' : 'My To-Do'}
          </h1>
          <p className="text-gray-600 mt-1">
            {locale === 'ar' ? 'قائمة مهام سريعة وبسيطة' : 'Quick and simple task list'}
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          {locale === 'ar' ? 'إضافة مهمة' : 'Add Task'}
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setFilter('all')}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              {locale === 'ar' ? 'إجمالي المهام' : 'Total Tasks'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{todos.length}</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setFilter('active')}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Circle className="h-4 w-4" />
              {locale === 'ar' ? 'نشطة' : 'Active'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{activeTodos.length}</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setFilter('completed')}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              {locale === 'ar' ? 'مكتملة' : 'Completed'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{completedTodos.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Star className="h-4 w-4" />
              {locale === 'ar' ? 'مهمة' : 'Important'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{importantTodos.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            {locale === 'ar' ? 'الكل' : 'All'} ({todos.length})
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('active')}
          >
            {locale === 'ar' ? 'نشطة' : 'Active'} ({activeTodos.length})
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            {locale === 'ar' ? 'مكتملة' : 'Completed'} ({completedTodos.length})
          </Button>
        </div>

        {completedTodos.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleClearCompleted} className="text-red-600">
            <Trash2 className="h-4 w-4 mr-2" />
            {locale === 'ar' ? 'حذف المكتملة' : 'Clear Completed'}
          </Button>
        )}
      </div>

      {/* To-Do List */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'ar' ? 'المهام' : 'Tasks'}</CardTitle>
          <CardDescription>
            {locale === 'ar'
              ? 'انقر على المهمة لتحديدها كمكتملة أو غير مكتملة'
              : 'Click on a task to mark it as complete or incomplete'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              <CheckSquare className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">
                {filter === 'completed'
                  ? locale === 'ar'
                    ? 'لا توجد مهام مكتملة'
                    : 'No completed tasks'
                  : locale === 'ar'
                  ? 'لا توجد مهام'
                  : 'No tasks'}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {locale === 'ar' ? 'ابدأ بإضافة مهمة جديدة' : 'Start by adding a new task'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`group flex items-center gap-3 p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    todo.completed
                      ? 'bg-gray-50 border-gray-200'
                      : todo.important
                      ? 'bg-purple-50 border-purple-200'
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {/* Checkbox */}
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => handleToggleComplete(todo.id)}
                    className="h-5 w-5"
                  />

                  {/* Task Text */}
                  <div className="flex-1 min-w-0" onClick={() => handleToggleComplete(todo.id)}>
                    <p
                      className={`cursor-pointer ${
                        todo.completed
                          ? 'line-through text-gray-500'
                          : 'text-gray-900 font-medium'
                      }`}
                    >
                      {todo.text}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        {formatDate(todo.createdAt)} {formatTime(todo.createdAt)}
                      </span>
                      {todo.completedAt && (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          {locale === 'ar' ? 'مكتملة' : 'Done'} {formatTime(todo.completedAt)}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Important Badge */}
                  {todo.important && !todo.completed && (
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                      <Star className="h-3 w-3 mr-1 fill-purple-700" />
                      {locale === 'ar' ? 'مهم' : 'Important'}
                    </Badge>
                  )}

                  {/* Actions */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleToggleImportant(todo.id)}>
                          <Star className={`h-4 w-4 mr-2 ${todo.important ? 'fill-purple-600' : ''}`} />
                          {todo.important
                            ? locale === 'ar'
                              ? 'إزالة من المهم'
                              : 'Remove Important'
                            : locale === 'ar'
                            ? 'وضع علامة كمهم'
                            : 'Mark as Important'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          {locale === 'ar' ? 'حذف' : 'Delete'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              {locale === 'ar' ? 'إضافة مهمة جديدة' : 'Add New Task'}
            </DialogTitle>
            <DialogDescription>
              {locale === 'ar' ? 'أدخل نص المهمة الجديدة' : 'Enter the text for your new task'}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Input
              placeholder={locale === 'ar' ? 'مثال: مراجعة التقارير' : 'e.g., Review reports'}
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddTodo();
                }
              }}
              autoFocus
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                setNewTodoText('');
              }}
            >
              {locale === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={handleAddTodo} className="bg-blue-600 hover:bg-blue-700">
              {locale === 'ar' ? 'إضافة' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
