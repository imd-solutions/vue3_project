export enum StorageType {
  // last until browser does full page refresh
  inMemory,

  // data still there for subsequent visit even after browser close
  local,

  // last til browser close
  session,
}
