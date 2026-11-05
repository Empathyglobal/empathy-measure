import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/empathy/Footer";

function ChartBars() {
  return (
    <svg viewBox="0 0 700 250" role="img" aria-label="Bar chart comparing how well thinking ability and emotional skill predict job performance" className="w-full h-auto">
      <text x="0" y="16" fontSize="13.5" fill="hsl(var(--muted-foreground))">Thinking ability, the figure everyone still quotes</text>
      <rect x="0" y="26" width="612" height="30" rx="7" fill="hsl(var(--border))" />
      <text x="626" y="47" fontSize="17" fill="hsl(var(--muted-foreground))">0.51</text>

      <text x="0" y="98" fontSize="13.5" fill="hsl(var(--foreground))">Thinking ability, after the 2022 correction</text>
      <rect x="0" y="108" width="372" height="30" rx="7" fill="hsl(var(--primary))" />
      <text x="386" y="129" fontSize="17" fill="hsl(var(--primary))">0.31</text>

      <text x="0" y="180" fontSize="13.5" fill="hsl(var(--foreground))">Emotional skill</text>
      <rect x="0" y="190" width="288" height="30" rx="7" fill="hsl(var(--primary))" />
      <rect x="288" y="190" width="72" height="30" fill="hsl(var(--primary))" opacity="0.45" />
      <text x="374" y="211" fontSize="17" fill="hsl(var(--primary))">0.24 to 0.30</text>

      <text x="0" y="243" fontSize="11" fill="hsl(var(--muted-foreground))">correlation with performance at work, where 0 is no relationship and 1 is perfect</text>
    </svg>
  );
}

function ChartAI() {
  return (
    <svg viewBox="0 0 700 200" role="img" aria-label="Chart showing employment falling in jobs exposed to AI and rising in jobs that are not" className="w-full h-auto">
      <text x="0" y="20" fontSize="13.5" fill="hsl(var(--foreground))">In the jobs most exposed to AI</text>
      <line x1="330" y1="28" x2="330" y2="168" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <rect x="178" y="30" width="152" height="32" rx="7" fill="hsl(var(--muted-foreground))" />
      <text x="166" y="52" fontSize="18" fill="hsl(var(--muted-foreground))" textAnchor="end">-3.8%</text>

      <text x="0" y="102" fontSize="13.5" fill="hsl(var(--foreground))">In the jobs least exposed to AI</text>
      <rect x="330" y="112" width="80" height="32" rx="7" fill="hsl(var(--primary))" />
      <text x="424" y="134" fontSize="18" fill="hsl(var(--primary))">+2%</text>

      <text x="330" y="192" fontSize="11" fill="hsl(var(--muted-foreground))" textAnchor="middle">change per year, mid 2026</text>
    </svg>
  );
}

function ChartSocial() {
  return (
    <svg viewBox="0 0 700 190" role="img" aria-label="Chart showing social skill jobs growing and maths heavy socially light jobs shrinking" className="w-full h-auto">
      <text x="0" y="20" fontSize="13.5" fill="hsl(var(--foreground))">Jobs high in social skill</text>
      <line x1="250" y1="28" x2="250" y2="158" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <rect x="250" y="30" width="354" height="32" rx="7" fill="hsl(var(--primary))" />
      <text x="618" y="52" fontSize="18" fill="hsl(var(--primary))">+11.8</text>

      <text x="0" y="102" fontSize="13.5" fill="hsl(var(--foreground))">Maths heavy, socially light</text>
      <rect x="151" y="112" width="99" height="32" rx="7" fill="hsl(var(--muted-foreground))" />
      <text x="139" y="134" fontSize="18" fill="hsl(var(--muted-foreground))" textAnchor="end">-3.3</text>

      <text x="250" y="182" fontSize="11" fill="hsl(var(--muted-foreground))" textAnchor="middle">percentage points of all jobs</text>
    </svg>
  );
}

function Card({ children }) {
  return <div className="lift-card rounded-2xl border border-border bg-card p-5 sm:p-6">{children}</div>;
}

function Source({ children }) {
  return <p className="mt-3 text-xs text-muted-foreground">{children}</p>;
}

const EMPLOYER_ITEMS = [
  { n: 1, label: "Analytical thinking", hot: false },
  { n: 2, label: "Resilience, flexibility and agility", hot: true },
  { n: 3, label: "Leadership and social influence", hot: true },
  { n: 4, label: "Creative thinking", hot: false },
  { n: 5, label: "Motivation and self awareness", hot: true },
  { n: 6, label: "Technological literacy", hot: false },
  { n: 7, label: "Empathy and active listening", hot: true },
  { n: 8, label: "Curiosity and lifelong learning", hot: false },
  { n: 9, label: "Talent management", hot: true },
];

const REFERENCES = [
  "Sackett, P., Zhang, C., Berry, C. and Lievens, F. (2022). Revisiting meta analytic estimates of validity in personnel selection. Journal of Applied Psychology, 107(11), 2040 to 2068.",
  "O'Boyle, E., Humphrey, R., Pollack, J., Hawver, T. and Story, P. (2011). The relation between emotional intelligence and job performance. Journal of Organizational Behavior, 32, 788 to 818.",
  "Joseph, D. and Newman, D. (2010). Emotional intelligence, an integrative meta analysis and cascading model. Journal of Applied Psychology, 95, 54 to 78.",
  "Brynjolfsson, E., Chandar, B. and Chen, R. (2025). Canaries in the coal mine, six facts about the recent employment effects of artificial intelligence. Stanford Digital Economy Lab.",
  "Deming, D. (2017). The growing importance of social skills in the labor market. Quarterly Journal of Economics, 132(4), 1593 to 1640.",
  "Durlak, J., Weissberg, R., Dymnicki, A., Taylor, R. and Schellinger, K. (2011). The impact of enhancing students' social and emotional learning. Child Development, 82(1), 405 to 432.",
  "Jones, D., Greenberg, M. and Crowley, M. (2015). Early social emotional functioning and public health. American Journal of Public Health, 105(11).",
  "Moffitt, T. and colleagues (2011). A gradient of childhood self control predicts health, wealth and public safety. PNAS, 108(7).",
  "World Economic Forum (2025). Future of Jobs Report 2025.",
];

export default function Research() {
  useEffect(() => {
    document.title = "Is EQ more important than IQ, The Empathy Measure";
    return () => {
      document.title = "The Empathy Measure";
    };
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-5 pb-24 pt-10">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">The evidence</p>
      <h1 className="mt-3 font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        Everyone knows IQ matters. Almost nobody knows what happened to the number.
      </h1>
      <p className="body-text mt-5">
        Two things changed while no one was looking. A fifty year old statistic turned out to be wrong, and machines started doing the half of the work we spend twelve years training for.
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        These studies concern other instruments and settings. They do not establish the validity, age norms, or outcome-evaluation value of this experimental app.
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">The number that everybody quotes</h2>
        <p className="body-text mt-4">
          For decades the case was settled. Of everything you could measure about a person before hiring them, general mental ability predicted job performance best. The figure in the textbooks was a correlation of about 0.51. Nothing else came close, and every argument about school, testing and streaming rested on it.
        </p>
        <p className="body-text mt-4">
          In 2022, four researchers went back through the statistics behind that figure. They found that a correction applied to the underlying studies had been used wrongly for decades, inflating the result. Redone properly, the number fell to about 0.31.
        </p>

        <div className="mt-6">
          <Card>
            <p className="text-sm text-muted-foreground">How well each thing predicts job performance</p>
            <div className="mt-3">
              <ChartBars />
            </div>
          </Card>
          <Source>Sackett, Zhang, Berry and Lievens, Journal of Applied Psychology, 2022, revising the long standing Schmidt and Hunter estimate. Emotional skill range from O'Boyle and colleagues, Journal of Organizational Behavior, 2011, covering three different ways of measuring it.</Source>
        </div>

        <p className="body-text mt-6">
          Look at what that leaves. Emotional skill predicts performance at work about as well as thinking ability does. These are not two different worlds. They are the same neighbourhood, and one of them gets twelve years of school and a wall of tutoring, while the other gets almost nothing.
        </p>

        <div className="mt-8 rounded-2xl bg-foreground p-8 text-background">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">And one more thing from that paper</p>
          <p className="mt-3 text-lg font-semibold leading-snug">
            Once the numbers were corrected, the strongest predictor in the whole set was no longer a cognitive measure. It was a structured interview.
          </p>
          <p className="mt-3 text-sm">
            Validated structured interviews use defined scoring methods and evidence from their target settings. This app explores an adaptive conversation design; it has not established equivalent validity.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-foreground">Meanwhile, the machines arrived</h2>
        <p className="body-text mt-4">
          Here is the part that changes the argument entirely, and it is happening now rather than in a forecast.
        </p>
        <p className="body-text mt-4">
          Stanford economists tracked payroll records for millions of American workers, taken from the largest payroll company in the country. Since generative AI came into wide use in late 2022, employment for people aged 22 to 25 in the jobs most exposed to AI has fallen sharply, while people doing the same jobs with more experience were unaffected. For young software developers the drop was around twenty percent.
        </p>

        <div className="mt-6">
          <Card>
            <p className="text-sm text-muted-foreground">Annual change in employment, workers aged 22 to 25</p>
            <div className="mt-3">
              <ChartAI />
            </div>
          </Card>
          <Source>Brynjolfsson, Chandar and Chen, Stanford Digital Economy Lab, from ADP payroll records. Their 2025 paper found a relative employment decline of 13 to 16 percent for 22 to 25 year olds in the most exposed occupations, controlling for company level shocks, while experienced workers in the same roles stayed stable. The declines cluster in work where AI replaces the task rather than assisting it.</Source>
        </div>

        <blockquote className="mt-8 border-l-4 border-primary pl-4 text-lg font-medium leading-snug text-foreground">
          The jobs being automated first are the ones that reward exactly what school measures. The jobs still hiring young people are the ones full of other people.
        </blockquote>

        <p className="body-text mt-6">
          In the same data, young people working as health aides were being hired faster than older ones. Care work, teaching, sales, negotiation, management, medicine. Work whose core is another human being in front of you, whose mood you have to read and whose trust you have to hold.
        </p>
        <p className="body-text mt-4">
          So the question a parent should be asking is not whether emotional skill matters as much as thinking. It is which half of the work is being handed to machines, and what is left for a person to be good at.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-foreground">The shift started long before AI</h2>
        <p className="body-text mt-4">
          Between 1980 and 2012, the share of American jobs demanding strong social skills grew by nearly twelve percentage points. Over the very same period, jobs that were mathematically demanding but socially light, including many of the technical roles parents still steer children toward, shrank.
        </p>

        <div className="mt-6">
          <Card>
            <p className="text-sm text-muted-foreground">Change in share of the United States workforce, 1980 to 2012</p>
            <div className="mt-3">
              <ChartSocial />
            </div>
          </Card>
          <Source>Deming, The Growing Importance of Social Skills in the Labor Market, Quarterly Journal of Economics, 2017.</Source>
        </div>

        <p className="body-text mt-6">
          One detail in that paper matters more than the headline, and we would rather tell you than have you find it. The fastest growth in both jobs and pay was not in social skill on its own. It was in the work that demands both, the person who can do the analysis and hold the room. That is the honest shape of it. Not one instead of the other. Both, with only one of them being taught.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-foreground">What employers say they want</h2>
        <Card>
          <ol className="space-y-2">
            {EMPLOYER_ITEMS.map((item) => (
              <li
                key={item.n}
                className={
                  "flex gap-3 " +
                  (item.hot ? "font-semibold text-primary" : "text-foreground")
                }
              >
                <span className="w-6 shrink-0">{item.n}.</span>
                <span>{item.label}</span>
              </li>
            ))}
          </ol>
          <Source>World Economic Forum, Future of Jobs Report 2025, surveying employers of millions of workers. Seven in ten companies call analytical thinking essential, so it stays at the top. Six of the nine are human skills, marked here in blue. The same employers expect 39 percent of the skills a job needs today to have changed by 2030.</Source>
        </Card>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-foreground">And unlike IQ, it can be taught</h2>
        <p className="body-text mt-4">
          This is the part that decides whether any of the above is useful to you. A trait you cannot change is a label. A skill you can change is a plan.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card>
            <p className="text-4xl font-semibold text-primary">+11</p>
            <p className="body-text mt-3">
              percentile points in academic achievement for children taught social and emotional skills directly, compared with children who were not. Their behaviour and their distress improved too.
            </p>
            <Source>Durlak and colleagues, Child Development, 2011. 213 school programmes, 270,034 children, roughly half randomly assigned.</Source>
          </Card>
          <Card>
            <p className="text-4xl font-semibold text-primary">20 yrs</p>
            <p className="body-text mt-3">
              later it was still visible. Teachers' ratings of how five year olds got along with others predicted their education, employment and criminal records two decades on.
            </p>
            <Source>Jones, Greenberg and Crowley, American Journal of Public Health, 2015. Similar results from a New Zealand birth cohort followed for over thirty years.</Source>
          </Card>
        </div>

        <p className="body-text mt-6">
          Those long running studies matter because they answer the obvious objection. The New Zealand cohort found childhood self control predicting adult health, wealth and criminal record independently of intelligence and family income. It was not just clever rich children doing well again.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-foreground">Where this skill pays most</h2>
        <p className="body-text mt-4">
          The research agrees on something specific and useful. Emotional skill predicts performance most strongly in work that is emotionally demanding, where someone handles other people all day. In work with few human interactions it predicts much less.
        </p>
        <p className="body-text mt-4">
          That is not a weakness in the finding. It is a map. The value of this skill rises exactly in the work that is growing, and falls in the work that is being automated.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border-2 border-dashed border-muted-foreground/50 p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          What the evidence does not say
        </p>
        <p className="body-text mt-3">
          You have probably met the claim that emotional intelligence accounts for eighty percent of success, or that it matters twice as much as IQ. Those numbers came from popular books in the 1990s. No study produced them, and we are not going to repeat them to sell you something.
        </p>
        <p className="body-text mt-3">
          On AI, the honest position is that the aggregate employment numbers do not yet show an economy wide shock, and some of the current hiring slowdown is ordinary economic weather rather than automation. What is well evidenced is the narrow, sharp effect on the entry rung of the most exposed work.
        </p>
        <p className="body-text mt-3">
          And one set of questions is a sample of how a person answered on one day. It is not a diagnosis, not a personality type, and not a verdict on anybody.
        </p>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="font-semibold text-primary">If you are a parent</p>
          <p className="body-text mt-2">
            The fictional examples can help start a discussion about emotional skills. A model-generated report does not establish where a child stands against other children, and should not label or rank them.
          </p>
          <Link
            to="/"
            className="btn-lift btn-primary-lift mt-4 inline-block rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Begin
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="font-semibold text-primary">If you run a school</p>
          <p className="body-text mt-2">
            Use this preview to study an experimental reflection design with fictional data. It does not provide group reporting or evidence that a programme worked. Any real-participant research needs independent evaluation, appropriate consent, and a reviewed data-retention plan.
          </p>
          <Link
            to="/schools"
            className="btn-lift mt-4 inline-block rounded-xl border border-border bg-card px-6 py-3 text-base font-semibold text-foreground transition hover:bg-secondary"
          >
            For schools
          </Link>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-primary p-8 text-center text-primary-foreground">
        <p className="text-2xl font-semibold">An experimental conversation design</p>
        <p className="mt-2 text-base">
          Ten adaptive prompts explore seven themes. Language support is experimental; equivalent scores across languages or sessions have not been established.
        </p>
        <Link
          to="/"
          className="btn-lift mt-5 inline-block rounded-xl bg-background px-6 py-3 text-base font-semibold text-primary transition hover:bg-background/90"
        >
          Begin
        </Link>
      </div>

      <div className="mt-12 border-t border-border pt-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">References</p>
        <ul className="mt-3 space-y-2">
          {REFERENCES.map((ref, i) => (
            <li key={i} className="text-xs text-muted-foreground">{ref}</li>
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  );
}