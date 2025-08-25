import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

const Index = () => {
  const depositData = {
    clientName: "Сидорова Анастасия Витальевна",
    depositAmount: 120960,
    interestRate: 18.5,
    openDate: "28.04.2024",
    closeDate: "28.08.2025",
    totalAmount: 220960,
    paymentHistory: [
      { date: "28.08.2024", amount: 72350 },
      { date: "28.12.2024", amount: 74320 },
      { date: "28.04.2025", amount: 74290 }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU').format(amount) + ' ₽';
  };

  const calculateDaysRemaining = () => {
    const closeDate = new Date('2025-08-28');
    const today = new Date();
    const diffTime = closeDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const calculateProgress = () => {
    const startDate = new Date('2024-04-28');
    const endDate = new Date('2025-08-28');
    const today = new Date();
    
    const totalDays = endDate.getTime() - startDate.getTime();
    const passedDays = today.getTime() - startDate.getTime();
    
    return Math.min(100, Math.max(0, (passedDays / totalDays) * 100));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">В</span>
          </div>
          <h1 className="text-2xl font-bold">ВТБ Личный кабинет</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="User" size={20} />
          <span className="text-sm text-gray-300">{depositData.clientName}</span>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Deposit Overview */}
        <Card className="bg-gray-900 border-gray-800 col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Icon name="PiggyBank" size={24} />
              <span>Мой вклад</span>
              <Badge className="bg-green-600 text-white">Активный</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Сумма вклада</p>
                <p className="text-3xl font-bold text-white">{formatCurrency(depositData.depositAmount)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Процентная ставка</p>
                <p className="text-3xl font-bold text-blue-400">{depositData.interestRate}%</p>
              </div>
            </div>
            
            <Separator className="bg-gray-800" />
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Дата открытия</p>
                <p className="text-lg text-white">{depositData.openDate}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Дата закрытия</p>
                <p className="text-lg text-white">{depositData.closeDate}</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400 text-sm">Прогресс вклада</p>
                <p className="text-sm text-blue-400">{calculateDaysRemaining()} дней до закрытия</p>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Итоговые показатели</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg">
              <p className="text-blue-100 text-sm mb-1">Сумма к получению</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(depositData.totalAmount)}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Начислено процентов:</span>
                <span className="text-white font-medium">
                  {formatCurrency(depositData.totalAmount - depositData.depositAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Всего выплачено:</span>
                <span className="text-green-400 font-medium">
                  {formatCurrency(depositData.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0))}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Icon name="History" size={24} />
            <span>История выплат процентов</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Дата выплаты</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Сумма</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Статус</th>
                </tr>
              </thead>
              <tbody>
                {depositData.paymentHistory.map((payment, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-4 px-4 text-white">{payment.date}</td>
                    <td className="py-4 px-4 text-right text-green-400 font-medium">
                      + {formatCurrency(payment.amount)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge className="bg-green-600 text-white">
                        Выплачено
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800">
            <div className="flex items-center space-x-2 text-blue-400">
              <Icon name="Info" size={16} />
              <span className="text-sm font-medium">Информация о следующей выплате</span>
            </div>
            <p className="text-gray-300 text-sm mt-1">
              Следующая выплата процентов запланирована на {depositData.closeDate}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>ВТБ — Банк будущего уже сегодня</p>
      </div>
    </div>
  );
};

export default Index;