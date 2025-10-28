import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { MapPin, ExternalLink, Search } from 'lucide-react';
import { mockComplaints } from '@/data/mockData';

const statusColors = {
  OPEN: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  ASSIGNED: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  IN_PROGRESS: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  RESOLVED: 'bg-green-500/10 text-green-700 dark:text-green-400',
  REJECTED: 'bg-red-500/10 text-red-700 dark:text-red-400',
};

const MapView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredComplaints = mockComplaints.filter((complaint) => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          complaint.locationAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || complaint.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const openInGoogleMaps = (lat: number, lng: number, title: string) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}&label=${encodeURIComponent(title)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <MapPin className="h-8 w-8 text-primary" />
            Complaint Location Map
          </h1>
          <p className="text-muted-foreground">
            View all complaints with their geographic locations
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Complaint List with Maps */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search and Filter */}
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by title, description, or address..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 rounded-md border border-input bg-background"
                  >
                    <option value="ALL">All Status</option>
                    <option value="OPEN">Open</option>
                    <option value="ASSIGNED">Assigned</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Complaint Cards */}
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
                <Card key={complaint.id} className="shadow-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{complaint.title}</CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {complaint.description}
                        </p>
                      </div>
                      <Badge className={statusColors[complaint.status]} variant="outline">
                        {complaint.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium">{complaint.locationAddress}</p>
                        <p className="text-muted-foreground text-xs">
                          {complaint.latitude.toFixed(6)}, {complaint.longitude.toFixed(6)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary">{complaint.category}</Badge>
                      <Badge variant="outline">{complaint.priority}</Badge>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openInGoogleMaps(complaint.latitude, complaint.longitude, complaint.title)}
                        className="flex-1"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on Map
                      </Button>
                      <Button asChild size="sm" className="flex-1">
                        <Link to={`/complaints/${complaint.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredComplaints.length === 0 && (
                <Card className="shadow-card">
                  <CardContent className="p-12 text-center">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No complaints found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filter criteria
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Map Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-sm">Open</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                  <span className="text-sm">Assigned</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <span className="text-sm">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm">Resolved</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Markers</span>
                  <span className="font-semibold">{mockComplaints.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Open</span>
                  <span className="font-semibold">
                    {mockComplaints.filter((c) => c.status === 'OPEN').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">In Progress</span>
                  <span className="font-semibold">
                    {mockComplaints.filter((c) => c.status === 'IN_PROGRESS' || c.status === 'ASSIGNED').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Resolved</span>
                  <span className="font-semibold">
                    {mockComplaints.filter((c) => c.status === 'RESOLVED').length}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Click on any marker to view complaint details</p>
                <p>• Use mouse wheel to zoom in/out</p>
                <p>• Drag to pan around the map</p>
                <p>• Colors indicate complaint status</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
