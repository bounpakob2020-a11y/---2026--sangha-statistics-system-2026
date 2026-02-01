
import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Users, Search, Database, BarChart3, Download, Plus, Trash2, Edit3, Save, FileUp, X, ChevronRight, User } from 'lucide-react';
import Swal from 'sweetalert2';
import { MonkRecord, TitleType, FamilyStatus } from './types';
import AdminTab from './components/AdminTab';
import SearchTab from './components/SearchTab';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'admin' | 'search'>('admin');
  const [records, setRecords] = useState<MonkRecord[]>([]);
  const [editingRecord, setEditingRecord] = useState<MonkRecord | null>(null);

  // Load initial data
  useEffect(() => {
    const saved = localStorage.getItem('sangha_stats_data');
    if (saved) {
      setRecords(JSON.parse(saved));
    }
  }, []);

  // Save to local storage whenever records change
  useEffect(() => {
    localStorage.setItem('sangha_stats_data', JSON.stringify(records));
  }, [records]);

  const handleSaveRecord = (record: MonkRecord) => {
    Swal.fire({
      title: 'ກໍາລັງບັນທຶກຂໍ້ມູນ...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    setTimeout(() => {
      if (editingRecord) {
        setRecords(prev => prev.map(r => r.id === record.id ? record : r));
        setEditingRecord(null);
      } else {
        setRecords(prev => [...prev, record]);
      }
      
      Swal.fire({
        icon: 'success',
        title: 'ບັນທຶກຂໍ້ມູນສໍາເລັດ!',
        timer: 1500,
        showConfirmButton: false
      });
    }, 800);
  };

  const handleDeleteRecord = (id: string) => {
    Swal.fire({
      title: 'ຢືນຢັນການລົບ?',
      text: "ທ່ານຈະບໍ່ສາມາດກູ້ຄືນຂໍ້ມູນນີ້ໄດ້!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3b82f6',
      confirmButtonText: 'ລົບເລີຍ',
      cancelButtonText: 'ຍົກເລີກ'
    }).then((result) => {
      if (result.isConfirmed) {
        setRecords(prev => prev.filter(r => r.id !== id));
        Swal.fire('ລົບສໍາເລັດ!', '', 'success');
      }
    });
  };

  const handleEditRecord = (record: MonkRecord) => {
    setEditingRecord(record);
    setActiveTab('admin');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2 rounded-xl shadow-lg">
              <Database className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-800">
                ລະບົບສະຖິຕິພຣະສົງ-ສາມະເນນ
              </h1>
              <p className="text-xs text-gray-500 font-medium">Sangha Statistical Management System</p>
            </div>
          </div>
          
          <nav className="flex space-x-1 bg-gray-100 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'admin' 
                ? 'bg-white text-orange-600 shadow-sm' 
                : 'text-gray-500 hover:text-orange-600 hover:bg-gray-50'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>ສໍາລັບແອັດມິນ (ຈັດການຂໍ້ມູນ)</span>
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'search' 
                ? 'bg-white text-orange-600 shadow-sm' 
                : 'text-gray-500 hover:text-orange-600 hover:bg-gray-50'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>ສໍາລັບຄົ້ນຫາ ແລະ ສະຫຼຸບ</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'admin' ? (
            <AdminTab 
              records={records} 
              onSave={handleSaveRecord} 
              onDelete={handleDeleteRecord} 
              onEdit={handleEditRecord}
              editingRecord={editingRecord}
              onClearEdit={() => setEditingRecord(null)}
            />
          ) : (
            <SearchTab records={records} onDelete={handleDeleteRecord} onEdit={handleEditRecord} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
