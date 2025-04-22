import { useState, useEffect } from 'react';
import { listenToChats, markChatAsRead } from '../../lib/chatUtils';
// import { ChatListItem } from '../chat/chat-list-item';
import ChatListItem from '../chat/chat-list-item';
// import { ChatDialog } from '../ui/product-ui/ChatDialog';
import ChatDialog from '../chat/ChatDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/product-ui/Tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/product-ui/Card';
import { MessageSquare } from 'lucide-react';

const user = JSON.parse(localStorage.getItem("user"))
// console.log("Current user: ",user.user);
let currentUser = {}
if(user){
 currentUser = {
    id: user.user._id,
    name: user.user.name,
    role: user.user.role,
  };
}

const getOtherUserName = (participants, currentUserId) => {
  const otherUserId = participants.find((id) => id !== currentUserId);
  return otherUserId === 'seller456' ? 'Jane Smith (Seller)' : 'Bob Johnson (Buyer)';
};

export default function MessagesSeller() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    console.log("current User",currentUser);
    
    const unsubscribe = listenToChats(currentUser.id, (updatedChats) => {
      setChats(updatedChats);
    });
    return () => unsubscribe();
  }, []);
console.log("Updated chats:",chats);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setIsChatDialogOpen(true);
    markChatAsRead(chat.id, currentUser.id);
  };

  console.log("chat ID",selectedChat)
  const filteredChats = activeTab === 'all' ? chats : chats.filter((chat) => chat.unreadCount > 0);

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Your Messages
            </CardTitle>
            <CardDescription>View and manage your conversations with buyers and sellers</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Messages</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  {chats.some((chat) => chat.unreadCount > 0) && (
                    <span className="ml-2 bg-destructive text-destructive-foreground rounded-full px-2 py-0.5 text-xs">
                      {chats.reduce((acc, chat) => acc + chat.unreadCount, 0)}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="space-y-1">
                  {chats.length > 0 ? (
                    chats.map((chat) => (
                      <ChatListItem
                        key={chat.id}
                        chat={chat}
                        currentUserId={currentUser.id}
                        otherUserName={getOtherUserName(chat.participants, currentUser.id)}
                        onClick={() => handleChatSelect(chat)}
                        isActive={selectedChat?.id === chat.id}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="mx-auto h-12 w-12 mb-3 opacity-20" />
                      <p>No messages yet</p>
                      <p className="text-sm">When you contact sellers or receive messages, they'll appear here</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="unread">
                <div className="space-y-1">
                  {filteredChats.length > 0 ? (
                    filteredChats.map((chat) => (
                      <ChatListItem
                        key={chat.id}
                        chat={chat}
                        currentUserId={currentUser.id}
                        otherUserName={getOtherUserName(chat.participants, currentUser.id)}
                        onClick={() => handleChatSelect(chat)}
                        isActive={selectedChat?.id === chat.id}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No unread messages</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

{
    selectedChat ? `chatID: ${selectedChat.id}` : `No chat ID found`
}
      {selectedChat && (
            
        
        <ChatDialog
          isOpen={isChatDialogOpen}
          onClose={() => setIsChatDialogOpen(false)}
          chatId={selectedChat.id}
          currentUserId={currentUser.id}
          recipientName={getOtherUserName(selectedChat.participants, currentUser.id)}
          productName={selectedChat.productName}
        />
      )}
    </div>
  );
}
