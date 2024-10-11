import React, { useState } from 'react';
import { Play, Pause, Save, ChevronRight, ChevronLeft, 
         Settings, Download, Upload, Users, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const FieldLabelingInterface = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showGrid, setShowGrid] = useState(true);
  
  const [players, setPlayers] = useState([
    { id: 1, x: 50, y: 50, role: 'fielder', label: 'F1', color: '#3B82F6' },
    { id: 2, x: 30, y: 30, role: 'fielder', label: 'F2', color: '#3B82F6' },
    { id: 3, x: 70, y: 30, role: 'fielder', label: 'F3', color: '#3B82F6' },
    { id: 4, x: 20, y: 60, role: 'fielder', label: 'F4', color: '#3B82F6' },
    { id: 5, x: 80, y: 60, role: 'fielder', label: 'F5', color: '#3B82F6' },
    { id: 6, x: 45, y: 80, role: 'bowler', label: 'B', color: '#EF4444' },
    { id: 7, x: 55, y: 20, role: 'batsman', label: 'BAT', color: '#10B981' },
  ]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1800px] mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-light tracking-tight">Cricket Field Analysis</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hover:bg-white/10">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-white/10">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-white/10">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-9">
            {/* Video Player */}
            <div className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden mb-8">
              <img 
                src="/api/placeholder/1200/675" 
                alt="Cricket match footage"
                className="w-full h-full object-cover"
              />
              
              {/* Video Controls */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div 
                    className="h-1 bg-white/10 rounded-full cursor-pointer relative"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      setCurrentTime(pos * duration);
                    }}
                  >
                    <motion.div 
                      className="absolute h-full bg-blue-500 rounded-full"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                      layoutId="progress"
                    />
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-white/10"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? 
                          <Pause className="h-5 w-5" /> : 
                          <Play className="h-5 w-5" />
                        }
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="hover:bg-white/10">
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-white/10">
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                      
                      <span className="text-sm font-light">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-zinc-900/50 rounded-lg p-4 backdrop-blur-sm">
              <div className="h-24 border border-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white/40 text-sm">Timeline markers will appear here</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-3 space-y-8">
            {/* Field View */}
            <div className="bg-zinc-900/50 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-light">Field View</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-white/10"
                  onClick={() => setShowGrid(!showGrid)}
                >
                  <Layout className="h-4 w-4" />
                </Button>
              </div>

              <div className="aspect-square relative bg-green-900/20 rounded-lg overflow-hidden border border-white/10">
                {/* Grid */}
                {showGrid && (
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className="border border-white/5" />
                    ))}
                  </div>
                )}
                
                {/* Field Markings */}
                <div className="absolute inset-[10%] border border-white/20 rounded-full" />
                <div className="absolute inset-x-[45%] top-0 bottom-[50%] border border-white/20" />
                
                {/* Players */}
                <AnimatePresence>
                  {players.map(player => (
                    <motion.div
                      key={player.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className={`absolute w-5 h-5 flex items-center justify-center
                                rounded-full cursor-move transform -translate-x-1/2 -translate-y-1/2
                                transition-shadow duration-200
                                ${selectedPlayer?.id === player.id ? 'ring-1 ring-white/50' : ''}`}
                      style={{ 
                        left: `${player.x}%`, 
                        top: `${player.y}%`,
                        backgroundColor: player.color
                      }}
                      onClick={() => setSelectedPlayer(player)}
                    >
                      <span className="text-xs font-medium text-white/90">{player.label}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Player Controls */}
            <div className="bg-zinc-900/50 rounded-lg p-4 backdrop-blur-sm">
              <h2 className="text-lg font-light mb-4">Player Controls</h2>
              
              {selectedPlayer ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Role</label>
                    <Select defaultValue={selectedPlayer.role}>
                      <SelectTrigger className="bg-black/50 border-white/10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/10">
                        <SelectItem value="fielder">Fielder</SelectItem>
                        <SelectItem value="bowler">Bowler</SelectItem>
                        <SelectItem value="batsman">Batsman</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Position</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-white/40">X: {selectedPlayer.x}%</label>
                        <Slider 
                          defaultValue={[selectedPlayer.x]} 
                          max={100} 
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/40">Y: {selectedPlayer.y}%</label>
                        <Slider 
                          defaultValue={[selectedPlayer.y]} 
                          max={100} 
                          step={1}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-white/40">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <span className="text-sm">Select a player to edit details</span>
                </div>
              )}
            </div>

            {/* Formation Controls */}
            <div className="bg-zinc-900/50 rounded-lg p-4 backdrop-blur-sm">
              <h2 className="text-lg font-light mb-4">Formation</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/60">Type</label>
                  <Select>
                    <SelectTrigger className="bg-black/50 border-white/10">
                      <SelectValue placeholder="Select formation type" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/10">
                      <SelectItem value="attacking">Attacking</SelectItem>
                      <SelectItem value="defensive">Defensive</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Formation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldLabelingInterface;
