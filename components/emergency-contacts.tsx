"use client"

import { useState, useEffect } from "react"
import { Phone, Video, Plus, Trash2, Edit, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface EmergencyContact {
  id: string
  name: string
  phone: string
  relationship: string
}

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([])
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null)
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: ""
  })

  // Load contacts from localStorage on mount
  useEffect(() => {
    const savedContacts = localStorage.getItem("emergencyContacts")
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts))
    }
  }, [])

  // Save contacts to localStorage whenever contacts change
  useEffect(() => {
    localStorage.setItem("emergencyContacts", JSON.stringify(contacts))
  }, [contacts])

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: EmergencyContact = {
        id: Date.now().toString(),
        name: newContact.name,
        phone: newContact.phone,
        relationship: newContact.relationship || "Emergency Contact"
      }
      setContacts([...contacts, contact])
      setNewContact({ name: "", phone: "", relationship: "" })
      setIsAddingContact(false)
    }
  }

  const updateContact = () => {
    if (editingContact && newContact.name && newContact.phone) {
      setContacts(contacts.map(contact => 
        contact.id === editingContact.id 
          ? { ...editingContact, ...newContact }
          : contact
      ))
      setEditingContact(null)
      setNewContact({ name: "", phone: "", relationship: "" })
    }
  }

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id))
  }

  const makePhoneCall = (phone: string, name: string) => {
    try {
      window.open(`tel:${phone}`, '_self')
    } catch (error) {
      alert(`Failed to initiate call to ${name}. Please dial ${phone} manually.`)
    }
  }

  const makeFaceTimeCall = (phone: string, name: string) => {
    try {
      // FaceTime URL scheme for iOS devices
      window.open(`facetime:${phone}`, '_self')
    } catch (error) {
      alert(`FaceTime not available. Initiating regular call to ${name} instead.`)
      makePhoneCall(phone, name)
    }
  }

  const startEditing = (contact: EmergencyContact) => {
    setEditingContact(contact)
    setNewContact({
      name: contact.name,
      phone: contact.phone,
      relationship: contact.relationship
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Emergency Contacts</h3>
        <Dialog open={isAddingContact} onOpenChange={setIsAddingContact}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Emergency Contact</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="Contact name"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="relationship">Relationship</Label>
                <Input
                  id="relationship"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  placeholder="e.g., Family, Friend, Doctor"
                />
              </div>
              <Button onClick={addContact} className="w-full">
                Add Contact
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {contacts.length === 0 ? (
        <Alert>
          <AlertDescription>
            No emergency contacts added yet. Add contacts to quickly call for help in emergencies.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <Card key={contact.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">{contact.name}</h4>
                    <p className="text-sm text-slate-600">{contact.relationship}</p>
                    <p className="text-sm text-slate-500">{contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => makePhoneCall(contact.phone, contact.name)}
                    className="bg-green-50 border-green-200 hover:bg-green-100"
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => makeFaceTimeCall(contact.phone, contact.name)}
                    className="bg-blue-50 border-blue-200 hover:bg-blue-100"
                  >
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEditing(contact)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteContact(contact.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Contact Dialog */}
      <Dialog open={!!editingContact} onOpenChange={() => setEditingContact(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Emergency Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                placeholder="Contact name"
              />
            </div>
            <div>
              <Label htmlFor="edit-phone">Phone Number *</Label>
              <Input
                id="edit-phone"
                type="tel"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="edit-relationship">Relationship</Label>
              <Input
                id="edit-relationship"
                value={newContact.relationship}
                onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                placeholder="e.g., Family, Friend, Doctor"
              />
            </div>
            <Button onClick={updateContact} className="w-full">
              Update Contact
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 