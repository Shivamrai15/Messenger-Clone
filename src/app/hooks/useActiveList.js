import { create } from "zustand";


const useActiveList = create((set)=>({
    members : [],
    add : (id) => set((state)=>({members : [...state.members, id]})),
    remove : (id) =>set((state)=>({members : state.members.filter((memberId)=>memberId!== id)})),
    set : (ids) => set({members : ids})
}));

export default useActiveList;