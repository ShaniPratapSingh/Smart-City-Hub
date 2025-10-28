import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FileUploader from '@/components/common/FileUploader';
import LocationPicker from '@/components/map/LocationPicker';

const NewComplaint = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    latitude: 28.6139,
    longitude: 77.2090,
    address: '',
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a complaint title.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.description.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a detailed description.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.category) {
      toast({
        title: 'Validation Error',
        description: 'Please select a complaint category.',
        variant: 'destructive',
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Submitting complaint:', {
      ...formData,
      files: files.map(f => f.name),
      timestamp: new Date().toISOString(),
    });

    toast({
      title: 'Complaint Submitted Successfully! ✓',
      description: `Your complaint "${formData.title}" has been registered. Tracking ID: #${Math.floor(Math.random() * 10000)}`,
    });

    setTimeout(() => navigate('/dashboard'), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">File New Complaint</h1>
          <p className="text-muted-foreground">Report a civic issue in your area</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Complaint Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief summary of the issue"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the problem..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ROAD">Road</SelectItem>
                      <SelectItem value="WATER">Water</SelectItem>
                      <SelectItem value="ELECTRICITY">Electricity</SelectItem>
                      <SelectItem value="SANITATION">Sanitation</SelectItem>
                      <SelectItem value="STREETLIGHT">Streetlight</SelectItem>
                      <SelectItem value="DRAINAGE">Drainage</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Priority *</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <LocationPicker
                onLocationChange={(lat, lng, address) => 
                  setFormData({ ...formData, latitude: lat, longitude: lng, address: address || '' })
                }
                initialLat={formData.latitude}
                initialLng={formData.longitude}
              />
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Attachments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUploader onFilesChange={setFiles} maxFiles={5} />
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1">Submit Complaint</Button>
            <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewComplaint;
