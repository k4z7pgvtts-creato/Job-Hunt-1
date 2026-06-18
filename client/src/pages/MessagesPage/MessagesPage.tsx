import { useState } from "react";
import PortalLayout from "@/components/layouts/portal/PortalLayout";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { useAppContext } from "@/context/AppContext";

const MessagesPage = () => {
  const { messages } = useAppContext();
  const [selectedId, setSelectedId] = useState(messages[0]?.id);
  const selectedConversation = messages.find((c) => c.id === selectedId);

  return (
    <PortalLayout title="Messages">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-sm text-gray-500 mt-1">
            Conversations with recruiters and companies.
          </p>
        </div>

        {messages.length > 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col sm:flex-row overflow-hidden min-h-[420px]">
            {/* Conversation list */}
            <div className="w-full sm:w-72 border-b sm:border-b-0 sm:border-r border-gray-200">
              {messages.map((conversation) => (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => setSelectedId(conversation.id)}
                  className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    selectedId === conversation.id ? "bg-indigo-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-gray-900">
                      {conversation.company}
                    </span>
                    <span className="text-xs text-gray-400">
                      {conversation.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-1">
                    {conversation.preview}
                  </p>
                  {conversation.unread && (
                    <span className="inline-block mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                  )}
                </button>
              ))}
            </div>

            {/* Conversation detail (placeholder content) */}
            <div className="flex-1 p-6 flex flex-col">
              {selectedConversation ? (
                <>
                  <h2 className="text-base font-semibold text-gray-900">
                    {selectedConversation.company}
                  </h2>
                  <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
                    Full conversation view coming soon.
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
                  Select a conversation to view messages.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-xl">
            <ChatBubbleLeftRightIcon className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No messages yet.</p>
          </div>
        )}
      </div>
    </PortalLayout>
  );
};

export default MessagesPage;