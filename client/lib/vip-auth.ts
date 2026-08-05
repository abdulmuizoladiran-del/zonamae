export type VipMember = {
  memberId: string;
  password: string;
  name: string;
  plan: string;
  status: "Active" | "Inactive";
};

export const vipMembers: VipMember[] = [
  {
    memberId: "ZM-2026-000001",
    password: "ZonaMae2026!",
    name: "John Smith",
    plan: "Gold VIP",
    status: "Active",
  },
  {
    memberId: "ZM-2026-000002",
    password: "ZonaMaeVIP!",
    name: "Sarah Brown",
    plan: "Diamond VIP",
    status: "Active",
  },
];

const SESSION_KEY = "zona-mae-vip-session";

export function findMember(memberId: string) {
  return vipMembers.find((member) => member.memberId === memberId);
}

export function getVipSession() {
  const memberId = window.localStorage.getItem(SESSION_KEY);
  return memberId ? findMember(memberId) : undefined;
}

export function saveVipSession(memberId: string, rememberMe: boolean) {
  if (rememberMe) {
    window.localStorage.setItem(SESSION_KEY, memberId);
  } else {
    window.sessionStorage.setItem(SESSION_KEY, memberId);
  }
}

export function clearVipSession() {
  window.localStorage.removeItem(SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
}

export function getLoggedInMember() {
  const memberId =
    window.localStorage.getItem(SESSION_KEY) ||
    window.sessionStorage.getItem(SESSION_KEY);
  return memberId ? findMember(memberId) : undefined;
}
