'use client';

export default function ProjectVisual({ type }: { type: string }) {
  if (type === "swap") {
    return (
      <div className="visual-swap">
        <span className="chain-dot eth">ETH</span>
        <div className="swap-path"><i /><i /><i /></div>
        <span className="chain-dot sol">SOL</span>
        <strong>AI ROUTE</strong>
      </div>
    );
  }
  if (type === "mint") {
    return (
      <div className="visual-mint">
        <div className="mint-art">
          {Array.from({ length: 9 }).map((_, i) => <i key={i} />)}
        </div>
        <span>IPFS_READY</span>
      </div>
    );
  }
  if (type === "radar") {
    return (
      <div className="visual-radar">
        <i /><i /><i />
        <span />
        <strong>THREAT MAP</strong>
      </div>
    );
  }
  return (
    <div className="visual-dashboard">
      <div><span /><span /><span /></div>
      <i /><i /><i />
      <strong>ADMIN CORE</strong>
    </div>
  );
}
