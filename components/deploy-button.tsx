/* eslint-disable @next/next/no-img-element -- the same remote badge a README embeds */

// The media file itself: the site's /button.svg alias is not live on deplo.build yet.
const BADGE = "https://deplo.build/api/media/file/button.svg";

export function DeployButton({ compose }: { compose: string }) {
  return (
    <div className="tile not-prose my-6 flex justify-center px-6 py-10">
      <a href={`https://deplo.build/deploy?compose=${compose}`} target="_blank" rel="noopener noreferrer">
        <img src={BADGE} alt="Deploy on Deplo" width={179} height={40} />
      </a>
    </div>
  );
}
